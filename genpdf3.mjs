import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import CDP from 'chrome-remote-interface';

const URL = 'https://aylin-uyar-portfolio.lovable.app/';
const OUT = '/mnt/documents/aylin-uyar-portfolio-v2.pdf';
const PORT = 9224;
const VIEW_W = 1440;

const chrome = spawn('/bin/chromium', [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  '--disable-dev-shm-usage', `--remote-debugging-port=${PORT}`,
  `--window-size=${VIEW_W},2000`, 'about:blank',
], { stdio: ['ignore', 'ignore', 'ignore'] });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

let client;
for (let i = 0; i < 30; i++) { try { client = await CDP({ port: PORT }); break; } catch { await sleep(500); } }
const { Page, Runtime, Emulation } = client;
await Page.enable(); await Runtime.enable();
await Emulation.setDeviceMetricsOverride({ width: VIEW_W, height: 1800, deviceScaleFactor: 2, mobile: false });
await Page.navigate({ url: URL }); await Page.loadEventFired(); await sleep(2500);

await Runtime.evaluate({ expression: `(async()=>{
  // hide fixed badge + lovable widget
  document.querySelectorAll('div').forEach(el=>{const s=getComputedStyle(el);const c=(el.className||'').toString();if(s.position==='fixed'&&c.includes('top-4')&&c.includes('right-4'))el.style.setProperty('display','none','important');});
  document.querySelectorAll("a,button,div,span").forEach(e=>{if(e.textContent&&e.textContent.trim().startsWith("Edit with")){let n=e;for(let i=0;i<5&&n;i++){n.style.display="none";n=n.parentElement;}}});document.querySelectorAll("iframe").forEach(f=>{try{f.remove()}catch{}});
  // open every collapsible
  document.querySelectorAll('details').forEach(d=>d.open=true);
  for(let pass=0; pass<3; pass++){
    document.querySelectorAll('[aria-expanded="false"]').forEach(b=>{try{b.click();}catch{}});
    await new Promise(r=>setTimeout(r,250));
  }
  // scroll for lazy renders
  const h=document.documentElement.scrollHeight;
  for(let y=0;y<h;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}
  window.scrollTo(0,0); await new Promise(r=>setTimeout(r,600));
})()`, awaitPromise: true });

await Runtime.evaluate({
  expression: `Promise.all([...document.images].filter(i=>!i.complete).map(i=>new Promise(res=>{i.onload=i.onerror=res})))`,
  awaitPromise: true,
});
await sleep(1500);

const { contentSize } = await Page.getLayoutMetrics();
const fullH = Math.ceil(contentSize.height);
console.log('contentSize', contentSize);

// Take full-page screenshot via CDP
const { data: pngB64 } = await Page.captureScreenshot({
  format: 'png',
  captureBeyondViewport: true,
  clip: { x: 0, y: 0, width: VIEW_W, height: fullH, scale: 1 },
});
await fs.writeFile('/tmp/qa/full2.png', Buffer.from(pngB64, 'base64'));
console.log('screenshot written');

await client.close(); chrome.kill();

// Slice into letter pages with reportlab
const py = `
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import LETTER
img = Image.open('/tmp/qa/full2.png')
W,H = img.size  # CSS pixels px = ~ same as points scale
PAGE_W, PAGE_H = LETTER  # 612 x 792 pts
margin = 18  # pts
inner_w = PAGE_W - 2*margin
scale = inner_w / W  # scale image to fit width
slice_h_px = int((PAGE_H - 2*margin) / scale)
c = canvas.Canvas('${OUT}', pagesize=LETTER)
y = 0
page = 0
while y < H:
    bottom = min(y + slice_h_px, H)
    crop = img.crop((0, y, W, bottom))
    tmp = f'/tmp/qa/slice_{page}.png'
    crop.save(tmp, 'PNG', optimize=True)
    img_h_pts = (bottom - y) * scale
    c.drawImage(tmp, margin, PAGE_H - margin - img_h_pts, width=inner_w, height=img_h_pts)
    c.showPage()
    y = bottom
    page += 1
c.save()
print('pages', page)
`;
await fs.writeFile('/tmp/qa/slice.py', py);
console.log('done prep');
`;
`;
process.exit(0);
