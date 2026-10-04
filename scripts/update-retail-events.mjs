import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';

export const feedUrl = 'https://tools.wowlazymacros.com/api/world-events.ics';
const unescapeText = text => text.replace(/\\[nN]/g,' ').replace(/\\([,;\\])/g,'$1').trim();
export function parseDate(value, key) {
  const match = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/.exec(value);
  if (!match || (match[4] && !match[7])) throw new Error('Unsupported calendar timezone');
  if (key.includes('TZID=')) throw new Error('Unverified source timezone');
  const [,y,m,d,h='00',min='00',sec='00'] = match;
  const iso = `${y}-${m}-${d}T${h}:${min}:${sec}.000Z`;
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime()) || date.toISOString() !== iso) throw new Error('Invalid source date');
  return {iso,allDay:!match[4]};
}
export function parseCalendar(text) {
  if (!text.includes('BEGIN:VCALENDAR')) throw new Error('Source did not return a calendar');
  const unfolded = text.replace(/\r?\n[ \t]/g,'');
  const events = [];
  for (const block of unfolded.split('BEGIN:VEVENT').slice(1)) {
    const fields = {};
    for (const line of block.split('END:VEVENT')[0].split(/\r?\n/)) {
      const separator = line.indexOf(':');
      if (separator < 0) continue;
      const key = line.slice(0,separator);
      fields[key.split(';')[0]] = {key,value:line.slice(separator+1)};
    }
    if (fields.RRULE) throw new Error('Recurring source rules require an explicit importer');
    if (!fields.DTSTART || !fields.DTEND || !fields.SUMMARY) continue;
    const start = parseDate(fields.DTSTART.value,fields.DTSTART.key);
    const end = parseDate(fields.DTEND.value,fields.DTEND.key);
    const title = unescapeText(fields.SUMMARY.value);
    if (!title || title.startsWith('[#') || Date.parse(end.iso)<=Date.parse(start.iso)) continue;
    const description = unescapeText(fields.DESCRIPTION?.value || '');
    const candidate = fields.URL?.value || description.match(/https:\/\/(?:www\.)?wowhead\.com\/event=\d+[^\s]*/)?.[0];
    const url = candidate && /^https:\/\/(?:www\.)?wowhead\.com\/event=\d+(?:\/[^\s]*)?$/.test(candidate) ? candidate : 'https://www.wowhead.com/events';
    const category = /brawl|battleground|arena/i.test(title) ? 'PvP' : /timewalking/i.test(title) ? 'Timewalking' : /bonus|dungeon event/i.test(title) ? 'Bonus events' : 'World events';
    events.push({id:unescapeText(fields.UID?.value || `${title}-${start.iso}`),title,startAt:start.iso,endAt:end.iso,allDay:start.allDay,category,url});
  }
  const unique = [...new Map(events.map(e=>[`${e.title}|${e.startAt}|${e.endAt}`,e])).values()].sort((a,b)=>a.startAt.localeCompare(b.startAt)||a.title.localeCompare(b.title));
  if (!unique.length) throw new Error('No dated events returned');
  return unique;
}
async function main() {
  const response = await fetch(feedUrl,{signal:AbortSignal.timeout(25000),headers:{Accept:'text/calendar','User-Agent':'ChroniclesOfAzeroth/1.0 public calendar reader'}});
  if (!response.ok) throw new Error(`Calendar source returned ${response.status}`);
  const events = parseCalendar(await response.text());
  const output = process.argv[2] || 'assets/data/retail-events.json';
  const result = {updatedAt:new Date().toISOString(),sourceName:'WoW Lazy Tools public calendar',sourceUrl:'https://tools.wowlazymacros.com/world-events',feedUrl,region:'Source reference schedule',events};
  await fs.mkdir(output.slice(0,output.lastIndexOf('/')) || '.',{recursive:true});
  await fs.writeFile(output,JSON.stringify(result,null,2)+'\n');
  console.log(`Published ${events.length} dated Retail events`);
}
if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) main().catch(e=>{console.error(e.message);process.exitCode=1;});
