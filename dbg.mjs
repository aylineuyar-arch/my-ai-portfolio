import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/bin/chromium', headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1800 });
await page.goto('https://aylin-uyar-portfolio.lovable.app', { waitUntil: 'networkidle0' });
const info = await page.evaluate(() => {
  const cards = document.querySelectorAll('a[href^="#project-"]');
  return Array.from(cards).slice(0,3).map(c => ({
    text: c.innerText.slice(0,80),
    rect: c.getBoundingClientRect().toJSON(),
    bg: getComputedStyle(c).backgroundColor,
  }));
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
