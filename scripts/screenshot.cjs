#!/usr/bin/env node
// Screenshots a storefront page at mobile and desktop widths for design review.
//
// Usage:
//   NODE_PATH="$(npm root -g)" node scripts/screenshot.cjs <url> [out-dir] [storefront-password]
//
// Writes <out-dir>/<slug>-mobile.png and <slug>-desktop.png (out-dir defaults
// to .screenshots/, which is git-ignored). Pass the storefront password when
// the store is still password-protected. Uses the Playwright + Chromium that
// cloud sessions have pre-installed.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [url, outDir = '.screenshots', storePassword] = process.argv.slice(2);
if (!url) {
  console.error('Usage: node scripts/screenshot.cjs <url> [out-dir] [storefront-password]');
  process.exit(1);
}

const viewports = {
  mobile: { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
  desktop: { width: 1440, height: 900, isMobile: false, deviceScaleFactor: 1 },
};

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const slug = new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '-') || 'home';
  // Cloud sessions route HTTPS through an agent proxy; Chromium needs it passed explicitly.
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const browser = await chromium.launch({ proxy });
  for (const [name, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({ viewport, isMobile: viewport.isMobile, deviceScaleFactor: viewport.deviceScaleFactor });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    if (storePassword && new URL(page.url()).pathname.startsWith('/password')) {
      await page.fill('input[type="password"]', storePassword);
      await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.press('input[type="password"]', 'Enter')]);
      await page.goto(url, { waitUntil: 'networkidle' });
    }
    const file = path.join(outDir, `${slug}-${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
    await context.close();
  }
  await browser.close();
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
