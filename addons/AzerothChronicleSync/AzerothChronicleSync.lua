-- Azeroth Chronicle Sync · Forever preview (Interface 16001).
-- Player-only data. No combat log, remote requests, chat collection or telemetry.
local ADDON = "AzerothChronicleSync"
local WATCHED = { xuthar = "Xuthar Morvayne", thorgar = "Thorgar Ironbeard", aelyndra = "Aelyndra Zephyrveil" }
local ORDER = { "xuthar", "thorgar", "aelyndra" }
local MAX_EVENTS, MAX_ZONES = 48, 36
local activeId
local f = CreateFrame("Frame")

local function safe(fn, fallback, ...)
  if type(fn) ~= "function" then return fallback end
  local ok, value = pcall(fn, ...)
  if not ok or value == nil then return fallback end
  return value
end
local function str(value, maxLen)
  if type(value) ~= "string" then return "" end
  return value:sub(1, maxLen or 160)
end
local function jsonString(value)
  local out = { '"' }
  value = tostring(value or "")
  for i = 1, #value do
    local n = value:byte(i)
    if n == 34 then out[#out+1] = '\\"'
    elseif n == 92 then out[#out+1] = '\\\\'
    elseif n < 32 then out[#out+1] = string.format("\\u%04x", n)
    else out[#out+1] = string.char(n) end
  end
  out[#out+1] = '"'
  return table.concat(out)
end
local function isArray(value)
  if #value == 0 then
    return next(value) == nil
  end
  for k in pairs(value) do
    if type(k) ~= "number" or k < 1 or k > #value or k % 1 ~= 0 then return false end
  end
  return true
end
local function encode(value)
  local typ = type(value)
  if typ == "string" then return jsonString(value) end
  if typ == "number" then
    if value ~= value or value == math.huge or value == -math.huge then return "null" end
    return tostring(value)
  end
  if typ == "boolean" then return value and "true" or "false" end
  if typ ~= "table" then return "null" end
  local result = {}
  if isArray(value) then
    for _, item in ipairs(value) do result[#result+1] = encode(item) end
    return "[" .. table.concat(result, ",") .. "]"
  end
  for k, item in pairs(value) do
    if type(k) == "string" then result[#result+1] = jsonString(k) .. ":" .. encode(item) end
  end
  return "{" .. table.concat(result, ",") .. "}"
end
local function export()
  if not ACSDB or ACSDB.paused then ACS_ExportHex = ""; return end
  local chars, events = {}, {}
  for _, id in ipairs(ORDER) do
    local character = ACSDB.characters[id]
    if character then
      chars[#chars+1] = {
        id = id, name = character.name, gameName = character.gameName,
        realm = character.realm, race = character.race, className = character.className,
        level = character.level or 1, zone = character.zone or "",
        subzone = character.subzone or "", xp = character.xp or 0, xpMax = character.xpMax or 0,
        professions = character.professions or {}, zones = character.zones or {},
        questsCompleted = character.questsCompleted or 0,
        firstSeenAt = character.firstSeenAt, lastSeenAt = character.lastSeenAt
      }
      for _, entry in ipairs(character.events or {}) do
        events[#events+1] = {
          characterId = id, type = entry.type, at = entry.at,
          title = entry.title, zone = entry.zone
        }
      end
    end
  end
  table.sort(events, function(a,b) return (a.at or 0) > (b.at or 0) end)
  local json = encode({
    schemaVersion = 1, source = ADDON, exportedAt = time(),
    characters = chars, events = events
  })
  ACS_ExportHex = (json:gsub(".", function(c) return string.format("%02X", string.byte(c)) end))
end
local function current()
  if not ACSDB or ACSDB.paused then return end
  local name = safe(UnitName, "", "player")
  if type(name) ~= "string" then return end
  local id = name:lower()
  if not WATCHED[id] then activeId = nil; return end
  activeId = id
  local c = ACSDB.characters[id]
  if not c then
    c = { id = id, name = WATCHED[id], gameName = name,
      firstSeenAt = time(), questsCompleted = 0, zones = {}, events = {}, professions = {} }
    ACSDB.characters[id] = c
  end
  c.name, c.gameName = WATCHED[id], str(name, 40)
  c.realm = str(safe(GetRealmName, ""), 80)
  local okRace, localizedRace, englishRace = pcall(UnitRace, "player")
  c.race = str(okRace and (englishRace or localizedRace) or "", 60)
  local okClass, localizedClass, englishClass = pcall(UnitClass, "player")
  c.className = str(okClass and (englishClass or localizedClass) or "", 60)
  c.level = tonumber(safe(UnitLevel, c.level or 1, "player")) or c.level or 1
  c.zone = str(safe(GetZoneText, ""), 100)
  c.subzone = str(safe(GetSubZoneText, ""), 100)
  c.xp = tonumber(safe(UnitXP, 0, "player")) or 0
  c.xpMax = tonumber(safe(UnitXPMax, 0, "player")) or 0
  c.lastSeenAt = time()
  local p1, p2 = nil, nil
  if type(GetProfessions) == "function" then
    local ok, a, b = pcall(GetProfessions)
    if ok then p1, p2 = a, b end
  end
  c.professions = {}
  for _, slot in ipairs({ p1 or 0, p2 or 0 }) do
    if slot > 0 and type(GetProfessionInfo) == "function" then
      local ok, pName, _, rank, maxRank = pcall(GetProfessionInfo, slot)
      if ok and type(pName) == "string" then
        c.professions[#c.professions+1] = { name = str(pName, 70), rank = tonumber(rank) or 0, maxRank = tonumber(maxRank) or 0 }
      end
    end
  end
  return c
end
local function addEvent(kind, label)
  local c = current()
  if not c then return end
  table.insert(c.events, { type = kind, title = str(label, 180), at = time(), zone = c.zone })
  while #c.events > MAX_EVENTS do table.remove(c.events, 1) end
  export()
end
local function updateZone()
  local c = current()
  if not c or c.zone == "" then return end
  if c.previousZone ~= c.zone then
    c.previousZone = c.zone
    local seen = false
    for _, zone in ipairs(c.zones) do if zone == c.zone then seen = true; break end end
    if not seen then
      c.zones[#c.zones+1] = c.zone
      while #c.zones > MAX_ZONES do table.remove(c.zones, 1) end
      addEvent("exploration", "Discovered " .. c.zone)
    end
  end
  export()
end
f:RegisterEvent("ADDON_LOADED")
f:RegisterEvent("PLAYER_LOGIN")
f:RegisterEvent("PLAYER_ENTERING_WORLD")
f:RegisterEvent("PLAYER_LEVEL_UP")
f:RegisterEvent("QUEST_TURNED_IN")
f:RegisterEvent("ZONE_CHANGED_NEW_AREA")
f:RegisterEvent("ZONE_CHANGED")
f:RegisterEvent("SKILL_LINES_CHANGED")
f:RegisterEvent("PLAYER_LOGOUT")
f:SetScript("OnEvent", function(_, event, ...)
  if event == "ADDON_LOADED" then
    if ... ~= ADDON then return end
    if type(ACSDB) ~= "table" then ACSDB = {} end
    if type(ACSDB.characters) ~= "table" then ACSDB.characters = {} end
    if type(ACS_ExportHex) ~= "string" then ACS_ExportHex = "" end
    return
  end
  if not ACSDB or ACSDB.paused then return end
  if event == "PLAYER_LOGIN" or event == "PLAYER_ENTERING_WORLD" then
    updateZone()
  elseif event == "ZONE_CHANGED_NEW_AREA" or event == "ZONE_CHANGED" then
    updateZone()
  elseif event == "PLAYER_LEVEL_UP" then
    local newLevel = tonumber((...))
    local c = current()
    if c and newLevel then c.level = newLevel end
    addEvent("level", "Reached level " .. tostring(newLevel or (c and c.level) or "?"))
  elseif event == "QUEST_TURNED_IN" then
    local questId = tonumber((...))
    local c = current()
    if not c then return end
    c.questsCompleted = (c.questsCompleted or 0) + 1
    local title
    if questId and C_QuestLog and type(C_QuestLog.GetTitleForQuestID) == "function" then
      title = safe(C_QuestLog.GetTitleForQuestID, "", questId)
    end
    if type(title) ~= "string" or title == "" then
      title = "Quest #" .. tostring(questId or "unknown")
    end
    addEvent("quest", "Completed: " .. title)
  elseif event == "SKILL_LINES_CHANGED" then
    current()
    export()
  elseif event == "PLAYER_LOGOUT" then
    current()
    export()
  end
end)
SLASH_AZEROTHCHRONICLESYNC1 = "/chronicle"
SLASH_AZEROTHCHRONICLESYNC2 = "/acs"
SlashCmdList.AZEROTHCHRONICLESYNC = function(message)
  local command, rest = (message or ""):match("^(%S+)%s*(.-)%s*$")
  command = (command or "status"):lower()
  if not ACSDB then print("|cffeed7a0Chronicle Sync: addon not ready.|r"); return end
  if command == "off" then
    ACSDB.paused = true; ACS_ExportHex = ""
    print("|cffeed7a0Chronicle Sync: paused. Nothing will be exported next save.|r")
  elseif command == "on" then
    ACSDB.paused = false; current(); export()
    print("|cffeed7a0Chronicle Sync: enabled. Use /reload or log out to save.|r")
  elseif command == "note" and rest ~= "" then
    addEvent("note", rest)
    print("|cffeed7a0Chronicle Sync: note queued for your next save.|r")
  elseif command == "status" then
    print("|cffeed7a0Chronicle Sync: " .. (ACSDB.paused and "paused" or "enabled") .. ". Tracking: Xuthar, Thorgar and Aelyndra. Use /acs note YOUR TEXT, /acs off or /acs on.|r")
  else
    print("|cffeed7a0Chronicle Sync: /acs status | /acs note TEXT | /acs off | /acs on.|r")
  end
end
