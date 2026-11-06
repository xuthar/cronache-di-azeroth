/**
 * One-shot diagnostic for the official Blizzard EU Forever character profile.
 * Read-only. Never writes output, never publishes or logs credentials/tokens.
 * This probe is intentionally separate from the production importer.
 */
const id = process.env.BLIZZARD_CLIENT_ID?.trim();
const secret = process.env.BLIZZARD_CLIENT_SECRET?.trim();
const namespace = (process.env.FOREVER_PROFILE_NAMESPACE || "profile-forever-eu").trim();
const slug = (process.env.FOREVER_XUTHAR_SLUG || "xuthar-morvayne").trim().toLowerCase();

function end(message, code = 1) {
  console.log(message);
  process.exitCode = code;
}
const readJson = async (response) => {
  try { return await response.json(); } catch { return null; }
};
const label = (value) => {
  if (typeof value === "string") return value;
  return value?.en_GB || value?.en_US || "";
};
async function main() {
  console.log("PROBE: Blizzard EU Forever · read-only · no publication");
  console.log("CHARACTER: Xuthar Morvayne");
  console.log("SECRET_CONFIGURATION: " + (id && secret ? "both present" : "missing Client ID or Client Secret"));
  if (!id || !secret) return end("RESULT: SECRETS_MISSING");
  if (namespace !== "profile-forever-eu" || slug !== "xuthar-morvayne") {
    return end("RESULT: INVALID_NAMESPACE_OR_CHARACTER_VARIABLES");
  }
  const timeout = () => AbortSignal.timeout(20000);
  const encoded = Buffer.from(id + ":" + secret).toString("base64");
  const oauth = await fetch("https://eu.battle.net/oauth/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + encoded,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    signal: timeout()
  });
  console.log("OAUTH_STATUS: HTTP " + oauth.status);
  if (!oauth.ok) return end("RESULT: OAUTH_UNSUCCESSFUL");
  const auth = await readJson(oauth);
  if (typeof auth?.access_token !== "string" || !auth.access_token) {
    return end("RESULT: OAUTH_TOKEN_NOT_RETURNED");
  }
  console.log("OAUTH: OK");
  const target = new URL("https://eu.api.blizzard.com/profile/wow/character/" + slug);
  target.searchParams.set("namespace", namespace);
  target.searchParams.set("locale", "en_GB");
  const profile = await fetch(target, {
    headers: { Authorization: "Bearer " + auth.access_token, Accept: "application/json" },
    signal: timeout()
  });
  console.log("PROFILE_STATUS: HTTP " + profile.status);
  if (!profile.ok) {
    return end("RESULT: PROFILE_UNAVAILABLE (API not yet verified for Xuthar; sync stays disabled)");
  }
  const data = await readJson(profile);
  const first = label(data?.name).trim();
  const surname = label(data?.surname).trim();
  const level = Number(data?.level);
  const match = first.toLowerCase() === "xuthar" && surname.toLowerCase() === "morvayne";
  console.log("PROFILE_NAME_MATCH: " + (match ? "YES" : "NO"));
  console.log("PROFILE_LEVEL: " + (Number.isInteger(level) && level >= 0 && level <= 100 ? level : "unavailable"));
  if (!match || !Number.isInteger(level) || level < 10 || level > 100) {
    return end("RESULT: PROFILE_MISMATCH_OR_INVALID_LEVEL (sync stays disabled)");
  }
  console.log("RESULT: VERIFIED_READ_ONLY_PROFILE (no synchronization enabled; no data published)");
}
main().catch(() => end("RESULT: NETWORK_OR_RUNTIME_ERROR (details withheld; no secrets logged)"));
