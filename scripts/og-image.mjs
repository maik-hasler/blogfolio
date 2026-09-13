/**
 * Erzeugt public/og-default.png (1200×630) für Open Graph und Twitter Cards:
 * das Kopfband des Steckbriefs mit Pixel-Headline und dem eigenen Piston.
 *
 * Aufruf: npm run og   (benötigt Playwright mit Chromium, z. B. `npx playwright install chromium`).
 * Eine global installierte Playwright-Kopie lässt sich über PLAYWRIGHT_MODULE=/pfad/zu/playwright/index.mjs
 * einbinden, ein eigenes Chromium über CHROMIUM_PATH.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');

const root = new URL('../', import.meta.url);
const piston = readFileSync(new URL('src/assets/piston.svg', root), 'utf8');
/* Als data:-URL eingebettet, weil eine per setContent geladene Seite keine file:-Schriften laden darf. */
const font = (file) => `data:font/woff2;base64,${readFileSync(new URL(`public/fonts/${file}`, root)).toString('base64')}`;

const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><style>
  @font-face { font-family: "Pixelify Sans"; src: url("${font('pixelify-sans-400-700-normal.woff2')}"); font-weight: 400 700; }
  @font-face { font-family: "IBM Plex Mono"; src: url("${font('ibm-plex-mono-600-normal.woff2')}"); font-weight: 600; }
  @font-face { font-family: "Inter"; src: url("${font('inter-400-700-normal.woff2')}"); font-weight: 400 700; }
  html, body { margin: 0; }
  body {
    width: 1200px; height: 630px; box-sizing: border-box; padding: 72px 88px;
    display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 48px;
    color: #f2efe4; font-family: Inter, sans-serif;
    background-color: #3a3a34;
    background-image:
      linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px),
      linear-gradient(to right, rgb(255 255 255 / 0.03) 4px, transparent 4px),
      linear-gradient(to bottom, rgb(255 255 255 / 0.03) 4px, transparent 4px);
    background-size: 8px 8px, 8px 8px, 32px 32px, 32px 32px;
  }
  .label { font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 22px; letter-spacing: 0.14em; text-transform: uppercase; color: #ff7d60; }
  h1 { font-family: "Pixelify Sans", monospace; font-weight: 700; font-size: 128px; line-height: 0.95; margin: 20px 0 0; text-transform: uppercase; text-shadow: 0.07em 0.07em 0 #1f1e1a; }
  .roles { font-family: "Pixelify Sans", monospace; font-weight: 700; font-size: 44px; margin-top: 20px; text-transform: uppercase; color: #d9d4c4; text-shadow: 0.07em 0.07em 0 #1f1e1a; }
  .roles b { color: #ff7d60; font-weight: 700; }
  .url { font-family: "IBM Plex Mono", monospace; font-size: 22px; color: #b5b09a; margin-top: 28px; }
  svg { width: 340px; height: auto; filter: drop-shadow(8px 12px 0 rgb(0 0 0 / 0.35)); }
</style></head><body>
  <div>
    <div class="label">Steckbrief</div>
    <h1>Maik<br>Hasler</h1>
    <div class="roles">Ausbilder. Architekt. <b>Piston.</b></div>
    <div class="url">maik-hasler.de</div>
  </div>
  ${piston}
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: fileURLToPath(new URL('public/og-default.png', root)), type: 'png' });
await browser.close();
console.log('public/og-default.png geschrieben');
