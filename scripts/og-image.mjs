/**
 * Generates public/og-default.png (1200×630) for Open Graph and Twitter
 * Cards: a quiet editorial layout with the custom trading card.
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
  @font-face { font-family: "EB Garamond"; src: url("${font('eb-garamond-400-normal.woff2')}"); font-weight: 400 900; }
  @font-face { font-family: "IBM Plex Mono"; src: url("${font('ibm-plex-mono-600-normal.woff2')}"); font-weight: 600; }
  @font-face { font-family: "Inter"; src: url("${font('inter-400-700-normal.woff2')}"); font-weight: 400 700; }
  html, body { margin: 0; }
  body {
    width: 1200px; height: 630px; box-sizing: border-box; padding: 72px 88px;
    display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 48px;
    color: #252b27; font-family: Inter, sans-serif;
    background: #f0efe8;
  }
  .label { font-family: "IBM Plex Mono", monospace; font-size: 18px; color: #71453a; }
  h1 { max-width: 650px; font-family: "EB Garamond", Georgia, serif; font-weight: 500; font-size: 96px; line-height: 0.92; margin: 24px 0 0; letter-spacing: -0.04em; }
  .roles { max-width: 540px; font-size: 28px; line-height: 1.4; margin-top: 26px; color: #626960; }
  .url { font-family: "IBM Plex Mono", monospace; font-size: 18px; color: #626960; margin-top: 42px; }
  .card { width: 310px; height: 434px; box-sizing: border-box; padding: 11px; border: 1px solid #252218; border-radius: 16px; background: #22221d; transform: rotate(2deg); box-shadow: 0 24px 42px rgb(24 27 26 / 0.28); }
  .frame { height: 100%; box-sizing: border-box; padding: 9px; border-radius: 12px; display: flex; flex-direction: column; gap: 7px; background: linear-gradient(145deg, #77724e, #484937 40%, #242b26); box-shadow: inset 0 0 0 1px rgb(218 202 142 / 0.55); }
  .bar { padding: 6px 10px; border-radius: 8px; background: linear-gradient(#f3ead1, #d6c9a5); color: #1b1a15; font: 700 18px "EB Garamond", Georgia, serif; }
  .art { height: 170px; border: 1px solid #151510; background: url(${photo}) center 25% / cover; filter: sepia(0.35) saturate(0.72); }
  .type { font-size: 14px; }
  .text { flex: 1; padding: 16px; border: 1px solid #9a8b62; border-radius: 3px; background: linear-gradient(#f3ead5, #e1d5b8); font: 16px/1.35 "EB Garamond", Georgia, serif; }
  .footer { display:flex; justify-content:space-between; color:#e8e5dc; font:10px "IBM Plex Mono",monospace; }
  .pt { padding:3px 12px; border-radius:5px; background:#e7d9b8; color:#252218; font:700 19px "EB Garamond",serif; }
</style></head><body>
  <div>
    <div class="label">Maik Hasler · Oldenburg</div>
    <h1>Software is a people business.</h1>
    <div class="roles">Software architect, trainer, and IHK examiner at VRG GmbH.</div>
    <div class="url">maik-hasler.de</div>
  </div>
  <div class="card"><div class="frame"><div class="bar">Maik Hasler <span style="float:right">2 ● ●</span></div><div class="art"></div><div class="bar type">Legendary Creature: Human Architect</div><div class="text">Whenever a teammate asks “why?”, investigate. If the answer is “it depends,” create a 1/1 curious human token.<br><br><em>“The human side of software matters more than ever.”</em></div><div class="footer"><span>Custom card · Oldenburg</span><span class="pt">2/3</span></div></div></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: fileURLToPath(new URL('public/og-default.png', root)), type: 'png' });
await browser.close();
console.log('public/og-default.png written');
