import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath:'/bin/chromium', headless:true, args:['--no-sandbox']});
const p = await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto('https://aylin-uyar-portfolio.lovable.app',{waitUntil:'networkidle0'});
const info = await p.evaluate(()=>{
  const cards = document.querySelectorAll('a[href^="#project-"]');
  return Array.from(cards).map(c=>({h:c.offsetHeight, w:c.offsetWidth, txt:c.textContent.slice(0,50)}));
});
console.log(JSON.stringify(info,null,2));
await b.close();
