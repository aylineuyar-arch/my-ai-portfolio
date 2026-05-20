import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({
  executablePath: '/bin/chromium', headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('https://aylin-uyar-portfolio.lovable.app', { waitUntil: 'networkidle0', timeout: 90000 });
// scroll to trigger lazy images
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 800) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 200));
  }
  window.scrollTo(0, 0);
});
await new Promise(r => setTimeout(r, 1500));
// hide lovable badge
await page.addStyleTag({ content: `
  #lovable-badge, [class*="lovable-badge"], a[href*="lovable.dev"][class*="fixed"] { display:none !important; }
  .whitespace-nowrap { white-space: normal !important; }
` });
await page.emulateMediaType('screen');
await page.pdf({
  path: '/mnt/documents/aylin-uyar-portfolio.pdf',
  printBackground: true,
  width: '1440px',
  height: '1900px',
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
});
await browser.close();
console.log('done');
