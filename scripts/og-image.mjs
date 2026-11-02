/**
 * Generates public/og-default.png (1200×630) for Open Graph and Twitter
 * Cards: the dark playmat with the headline and a miniature of the
 * trading card.
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
  @font-face { font-family: "IBM Plex Mono"; src: url("${font('ibm-plex-mono-600-normal.woff2')}"); font-weight: 600; }
  @font-face { font-family: "Inter"; src: url("${font('inter-400-700-normal.woff2')}"); font-weight: 400 700; }
  html, body { margin: 0; }
  body {
    width: 1200px; height: 630px; box-sizing: border-box; padding: 72px 88px;
    display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 48px;
    color: #f2efe4; font-family: Inter, sans-serif;
    background-color: #15131a;
    background-image:
      radial-gradient(ellipse 60% 60% at 75% 20%, rgb(233 185 73 / 0.18), transparent 70%),
      radial-gradient(ellipse 50% 40% at 10% 100%, rgb(142 35 48 / 0.35), transparent 70%);
  }
  .label { font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 22px; letter-spacing: 0.14em; text-transform: uppercase; color: #e9b949; }
  h1 { font-family: Cinzel, serif; font-weight: 700; font-size: 128px; line-height: 0.95; margin: 20px 0 0; text-transform: uppercase; text-shadow: 0.07em 0.07em 0 #0c0b10; }
  .roles { font-family: Cinzel, serif; font-weight: 700; font-size: 44px; margin-top: 20px; text-transform: uppercase; color: #d9d4c4; text-shadow: 0.07em 0.07em 0 #0c0b10; }
  .roles b { color: #e9b949; font-weight: 700; }
  .url { font-family: "IBM Plex Mono", monospace; font-size: 22px; color: #b5b09a; margin-top: 28px; }
  .card { width: 340px; height: 475px; box-sizing: border-box; padding: 14px; border-radius: 20px; background: #0c0a12; transform: rotate(4deg); box-shadow: 0 24px 50px rgb(0 0 0 / 0.6); }
  .frame { height: 100%; box-sizing: border-box; padding: 10px; border-radius: 12px; display: flex; flex-direction: column; gap: 8px; background: linear-gradient(160deg, #b89a4e, #6f5622); box-shadow: inset 0 0 0 2px rgb(0 0 0 / 0.4); }
  .bar { padding: 6px 12px; border-radius: 10px; background: linear-gradient(#f3e3a6, #c8ab5e); color: #0c0b10; font: 700 20px Cinzel, serif; }
  .art { height: 190px; border: 3px solid #e9b949; background: url(${photo}) center 25% / cover; filter: grayscale(1) contrast(1.1) sepia(0.45) saturate(1.4); }
  .text { flex: 1; border-radius: 4px; background: linear-gradient(#f7f1de, #e6dcbc); }
</style></head><body>
  <div>
    <div class="label">Legendary Creature</div>
    <h1>Maik<br>Hasler</h1>
    <div class="roles">Architect. Trainer. <b>Examiner.</b></div>
    <div class="url">maik-hasler.de</div>
  </div>
  <div class="card"><div class="frame"><div class="bar">Maik Hasler</div><div class="art"></div><div class="bar">Legendary Creature</div><div class="text"></div></div></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: fileURLToPath(new URL('public/og-default.png', root)), type: 'png' });
await browser.close();
console.log('public/og-default.png written');
