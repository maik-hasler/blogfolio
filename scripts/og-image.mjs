/**
 * Generates public/og-default.png (1200×630) for Open Graph and Twitter
 * Cards: a night-sky playmat with a large, custom legendary card.
 *
 * Run: npm run og   (needs Playwright with Chromium, e.g. `npx playwright install chromium`).
 * A globally installed Playwright copy can be wired in via
 * PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs, a custom Chromium via CHROMIUM_PATH.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');

const root = new URL('../', import.meta.url);
const photo = `data:image/png;base64,${readFileSync(new URL('src/assets/me.png', root)).toString('base64')}`;
/* Embedded as a data: URL, since a page loaded via setContent can't load file: fonts. */
const font = (file) => `data:font/woff2;base64,${readFileSync(new URL(`public/fonts/${file}`, root)).toString('base64')}`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
  @font-face { font-family: "Cinzel"; src: url("${font('cinzel-400-900-normal.woff2')}"); font-weight: 400 900; }
  @font-face { font-family: "EB Garamond"; src: url("${font('eb-garamond-400-normal.woff2')}"); font-weight: 400 900; }
  @font-face { font-family: "IBM Plex Mono"; src: url("${font('ibm-plex-mono-600-normal.woff2')}"); font-weight: 600; }
  @font-face { font-family: "Inter"; src: url("${font('inter-400-700-normal.woff2')}"); font-weight: 400 700; }
  html, body { margin: 0; }
  body {
    width: 1200px; height: 630px; box-sizing: border-box; padding: 72px 88px;
    display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 48px;
    color: #f5ecd8; font-family: Inter, sans-serif;
    background: #191521;
  }
  .label { font-family: "IBM Plex Mono", monospace; font-size: 18px; color: #d8bd72; }
  h1 { max-width: 650px; font-family: Cinzel, Georgia, serif; font-weight: 500; font-size: 80px; line-height: 0.98; margin: 24px 0 0; letter-spacing: -0.025em; }
  .roles { max-width: 540px; font-size: 28px; line-height: 1.4; margin-top: 26px; color: #d7d1dc; }
  .url { font-family: "IBM Plex Mono", monospace; font-size: 18px; color: #b7adbe; margin-top: 42px; }
  .card { width: 345px; height: 483px; box-sizing: border-box; padding: 5px; border: 2px solid #101016; border-radius: 10px; background: #403c48; box-shadow: 0 24px 42px rgb(0 0 0 / 0.6), inset 0 0 0 2px #b5964e; }
  .frame { height: 100%; box-sizing: border-box; padding: 5px; border: 2px solid #111016; border-radius: 7px; display: flex; flex-direction: column; gap: 6px; background: #292631; box-shadow: inset 0 0 0 1px #9a7941; }
  .bar { display:flex; align-items:center; justify-content:space-between; padding: 6px 9px; border: 1px solid #50443c; border-radius: 4px; background: #e8dfca; box-shadow: inset 0 0 0 1px #f7efd9; color: #201c1a; font: 700 15px Inter, sans-serif; letter-spacing:-0.02em; }
  .cost { display:flex; gap:2px; margin-right:-3px; }
  .cost i { display:grid; width:19px; height:19px; place-items:center; border-radius:50%; background:#d0c8b7; box-shadow:0 1px 2px rgb(0 0 0 / 0.45); font:700 12px Cinzel,serif; font-style:normal; }
  .cost i:nth-child(2) { background:#9ec9ee; }
  .cost i:nth-child(3) { background:#f0a58b; }
  .art { height: 150px; flex:none; border: 2px solid #17151b; outline: 1px solid #b5964e; background: #35333b; }
  .art img { width: 100%; height: 100%; object-fit: cover; object-position: center 27%; filter: saturate(0.88) contrast(1.06); }
  .type { min-height:30px; padding-block:4px; font-size:11px; }
  .set { display:grid; width:18px; height:18px; place-items:center; flex:none; border:1px solid #40311e; border-radius:50%; background:#c59a3e; color:#392918; font:700 11px Cinzel,serif; }
  .text { flex: 1; min-height:0; padding: 9px 10px; border: 1px solid #574c40; border-radius: 4px; box-shadow:inset 0 0 0 1px #fff7df; background: #f0e7d0; color:#241e20; font: 13px/1.19 "EB Garamond", Georgia, serif; }
  .text p { margin: 0; }
  .text p + p { margin-top: 6px; }
  .text .flavor { margin-top: 8px; padding-top: 6px; border-top: 1px solid rgb(48 39 34 / 0.4); font-style: italic; }
  .footer { display:flex; justify-content:space-between; align-items:end; min-height:24px; padding:0 4px; color:#f1e8d4; font:8px "IBM Plex Mono",monospace; letter-spacing:0.03em; }
  .pt { padding:3px 10px; border:1px solid #514632; border-radius:4px; background:#e8dfca; color:#211b21; font:700 18px Inter,sans-serif; }
</style></head><body>
  <div>
    <div class="label">Software architect · Oldenburg</div>
    <h1>I build software with people in mind.</h1>
    <div class="roles">Software architect, trainer, and IHK examiner at VRG GmbH.</div>
    <div class="url">maik-hasler.de</div>
  </div>
  <div class="card"><div class="frame"><div class="bar">Maik Hasler <span class="cost"><i>2</i><i>U</i><i>R</i></span></div><div class="art"><img src="${photo}"></div><div class="bar type">Legendary Creature: Human Advisor <span class="set">M</span></div><div class="text"><p>Whenever a teammate asks “why?”, investigate. (Create a Clue token.)</p><p>At your end step, put a +1/+1 counter on a Human you trained this turn.</p><p class="flavor">“Great software is a team sport.”</p></div><div class="footer"><span>MH · CUSTOM SET · 001</span><span class="pt">2/4</span></div></div></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: fileURLToPath(new URL('public/og-default.png', root)), type: 'png' });
await browser.close();
console.log('public/og-default.png written');
