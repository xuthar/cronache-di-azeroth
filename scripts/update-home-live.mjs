import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const officialUrl = 'https://worldofwarcraft.blizzard.com/it-it/news/24302093/';
export const feedUrl = 'https://www.wowhead.com/news/rss/all';
const liveUrl = 'https://raw.githubusercontent.com/xuthar/cronache-di-azeroth/live-news/home-live.json';
const months = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
const decode = text => text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&#(x[0-9a-f]+|\d+);/gi, (_, n) => { const code = n[0].toLowerCase() === 'x' ? parseInt(n.slice(1),16) : Number(n); return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : ''; }).replace(/&(amp|lt|gt|quot|apos);/g, (_, n) => ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"})[n]);
const plain = text => decode(text).replace(/<[^>]*>/g, '').trim();
const field = (xml, tag) => xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1] || '';

export function parseNews(xml) {
  if (!/<rss\b/i.test(xml)) throw new Error('Wowhead did not return an RSS feed');
  const items = [];
  const seen = new Set();
  for (const [, block] of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)) {
    const title = plain(field(block,'title'));
    const link = plain(field(block,'link'));
    const category = plain(field(block,'category'));
    const publishedAt = new Date(plain(field(block,'pubDate')));
    let url;
    try { url = new URL(link); } catch { continue; }
    if (url.protocol !== 'https:' || !['wowhead.com','www.wowhead.com'].includes(url.hostname) || !url.pathname.startsWith('/news') || !title || seen.has(link) || !Number.isFinite(publishedAt.getTime())) continue;
    if (/diablo|hearthstone|overwatch|other games/i.test(category)) continue;
    seen.add(link);
    items.push({title, url:link, category:category || 'WoW', publishedAt:publishedAt.toISOString()});
  }
  items.sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
  if (!items.length) throw new Error('No valid WoW headlines in feed');
  return items.slice(0,4);
}

export function parseLaunch(html) {
  const text = plain(html);
  const match = text.match(/disponibile in tutto il mondo il (\d{1,2}) ([a-zà]+) (\d{4}) alle (\d{1,2}):(\d{2}) (CEST|CET)/i);
  if (!match) throw new Error('Official launch time could not be identified');
  const month = months.indexOf(match[2].toLowerCase());
  const day = Number(match[1]), year = Number(match[3]), hour = Number(match[4]), minute = Number(match[5]);
  if (month < 0 || day < 1 || day > 31 || hour > 23 || minute > 59 || year < 2026 || year > 2035) throw new Error('Invalid official launch date');
  const local = new Date(Date.UTC(year,month,day,hour,minute));
  if (local.getUTCMonth() !== month) throw new Error('Invalid calendar day');
  const utc = new Date(local.getTime() - (match[6].toUpperCase() === 'CEST' ? 2 : 1) * 3600000);
  return {launchAt:utc.toISOString(),sourceUrl:officialUrl,checkedAt:new Date().toISOString()};
}

async function fetchText(url) {
  const response = await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'User-Agent':'ChroniclesOfAzeroth/1.0 (public RSS reader)','Accept':'application/rss+xml, application/xml, text/html, application/json'}});
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.text();
}

async function main() {
  const output = process.argv[2] || 'assets/data/home-live.json';
  let previous = {forever:{launchAt:'2026-11-04T23:00:00.000Z',sourceUrl:officialUrl,checkedAt:null},news:[],newsUpdatedAt:null};
  try { previous = {...previous, ...JSON.parse(await fs.readFile(output,'utf8'))}; } catch {}
  try {
    const remote = JSON.parse(await fetchText(liveUrl));
    if (remote.forever?.launchAt && Array.isArray(remote.news) && remote.news.length && Date.parse(remote.generatedAt) > Date.parse(previous.generatedAt || 0)) previous = remote;
  } catch { /* First run or temporary network failure: retain the checked-in snapshot. */ }
  const results = await Promise.allSettled([fetchText(feedUrl),fetchText(officialUrl)]);
  const result = {...previous,generatedAt:new Date().toISOString(),newsSource:'Wowhead',newsSourceUrl:'https://www.wowhead.com/news',newsRefreshMinutes:15};
  try {
    if (results[0].status !== 'fulfilled') throw results[0].reason;
    result.news = parseNews(results[0].value);
    result.newsUpdatedAt = new Date().toISOString();
    result.newsFeedBuiltAt = plain(field(results[0].value,'lastBuildDate'));
    result.newsFetchError = false;
  } catch (error) { result.newsFetchError = true; console.warn('Retaining previous Wowhead headlines:',error.message); }
  try {
    if (results[1].status !== 'fulfilled') throw results[1].reason;
    result.forever = parseLaunch(results[1].value);
    result.launchCheckError = false;
  } catch (error) { result.launchCheckError = true; console.warn('Retaining last verified launch date:',error.message); }
  if (!result.news.length) throw new Error('No current or saved headlines; refusing to publish empty news');
  await fs.mkdir(output.slice(0,output.lastIndexOf('/')) || '.',{recursive:true});
  await fs.writeFile(output,JSON.stringify(result,null,2)+'\n');
  console.log(`Saved ${result.news.length} Wowhead headlines and launch ${result.forever.launchAt}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch(error=>{console.error(error.message);process.exitCode=1;});
