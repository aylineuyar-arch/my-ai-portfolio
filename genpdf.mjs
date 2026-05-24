import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: '/bin/chromium',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1800, deviceScaleFactor: 2 });
await page.emulateMediaType('screen');
await page.goto('https://aylin-uyar-portfolio.lovable.app', { waitUntil: 'networkidle0', timeout: 60000 });

await page.addStyleTag({ content: `
  a[href*="lovable.dev"], [class*="lovable-badge"], iframe[src*="lovable"] { display: none !important; }
  * { animation-duration: 0.001s !important; animation-delay: 0s !important; }
` });

await page.evaluate(async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 300) { window.scrollTo(0, y); await sleep(60); }
  window.scrollTo(0, 0);
  await sleep(500);
});

await page.pdf({
  path: '/mnt/documents/aylin-portfolio.pdf',
  width: '1280px',
  height: '1800px',
  printBackground: true,
  margin: { top: '24px', bottom: '24px', left: '24px', right: '24px' },
  preferCSSPageSize: false,
});

await browser.close();
console.log('done');
