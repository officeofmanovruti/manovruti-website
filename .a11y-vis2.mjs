import { chromium } from 'playwright';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const browser=await chromium.launch();
for (const [name, rm] of [['reduce','reduce'],['nopref','no-preference']]) {
  const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,reducedMotion:rm});
  const page=await ctx.newPage();
  await page.goto(BASE+'/',{waitUntil:'load'}); await page.waitForTimeout(1500);
  // natural, slow wheel scroll
  for(let i=0;i<120;i++){ await page.mouse.wheel(0,120); await page.waitForTimeout(40); }
  await page.waitForTimeout(1500);
  const st = await page.evaluate(()=>{
    const h=[...document.querySelectorAll('*')].find(e=>(e.textContent||'').trim().startsWith('NA permission in Dadra'));
    const r=h?h.getBoundingClientRect():null;
    return {sy:Math.round(scrollY), bg:getComputedStyle(document.body).backgroundColor, dataText:document.body.dataset.text,
      headRect:r?{y:Math.round(r.y),x:Math.round(r.x)}:null, headColor:h?getComputedStyle(h).color:null};
  });
  console.log(name, JSON.stringify(st));
  await page.screenshot({path:SP+`/home-natural-${name}.png`});
  await ctx.close();
}
await browser.close();
