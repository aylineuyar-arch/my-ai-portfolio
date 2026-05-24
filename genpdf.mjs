import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/bin/chromium', headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1800, deviceScaleFactor: 2 });
await page.goto('https://aylin-uyar-portfolio.lovable.app', { waitUntil: 'networkidle0', timeout: 60000 });
await page.addStyleTag({ content: `
  a[href*="lovable.dev"], [class*="lovable-badge"], iframe[src*="lovable"] { display: none !important; }
  * { animation-duration: 0.001s !important; }
` });
await page.evaluate(async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 300) { window.scrollTo(0, y); await sleep(80); }
  window.scrollTo(0, 0); await sleep(800);
});

// Full-page screenshot then convert to PDF via image
const shot = '/tmp/portfolio.png';
await page.screenshot({ path: shot, fullPage: true, type: 'png' });
await browser.close();

// Use img2pdf-style via sharp + pdfkit? Simpler: use ImageMagick to convert chunks to a multi-page PDF.
console.log('screenshot done');
