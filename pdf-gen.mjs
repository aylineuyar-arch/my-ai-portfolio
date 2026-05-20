import puppeteer from 'puppeteer-core';
import { PDFDocument, PageSizes } from 'pdf-lib';
import fs from 'fs';

const b = await puppeteer.launch({ executablePath:'/bin/chromium', headless:true, args:['--no-sandbox']});
const p = await b.newPage();
const W = 1440;
await p.setViewport({width:W, height:900, deviceScaleFactor:2});
await p.goto('https://aylin-uyar-portfolio.lovable.app',{waitUntil:'networkidle0', timeout:120000});
await p.addStyleTag({content:`#lovable-badge,[class*="lovable-badge"],a[href*="lovable.dev"][class*="fixed"]{display:none!important}`});
// scroll for lazy images
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,150));}window.scrollTo(0,0);});
await new Promise(r=>setTimeout(r,1500));
const shotPath = '/tmp/full.png';
await p.screenshot({path:shotPath, fullPage:true});
await b.close();

const png = fs.readFileSync(shotPath);
const pdf = await PDFDocument.create();
const img = await pdf.embedPng(png);
// Slice image into PDF pages at A4 ratio matching W
const pageW = W; // points
const pageH = Math.round(W * Math.SQRT2); // A4 ratio
const totalH = img.height / 2; // because deviceScaleFactor=2, img is 2x scale
const imgW = img.width / 2;
// We'll draw at logical scale. Use pages of pageH logical pixels.
let y = 0;
while (y < totalH) {
  const page = pdf.addPage([pageW, pageH]);
  // Draw image positioned so the current slice appears at top of page.
  // Image y in pdf-lib is from bottom; we want top of slice at top of page.
  // Image full height (logical) = totalH. We place image with bottom at pageH - totalH + y.
  page.drawImage(img, {
    x: 0,
    y: pageH - totalH + y,
    width: imgW,
    height: totalH,
  });
  y += pageH;
}
fs.writeFileSync('/mnt/documents/aylin-uyar-portfolio.pdf', await pdf.save());
console.log('done', totalH);
