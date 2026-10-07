import { chromium } from 'playwright';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const browser=await chromium.launch();
const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1});
const page=await ctx.newPage();
await page.goto(BASE+'/',{waitUntil:'load'}); await page.waitForTimeout(1500);
let shot=0;
for(let i=0;i<260;i++){
  await page.mouse.wheel(0,120); await page.waitForTimeout(35);
  const st=await page.evaluate(()=>{
    const h=[...document.querySelectorAll('*')].find(e=>(e.textContent||'').trim().startsWith('NA permission in Dadra'));
    if(!h) return null; const r=h.getBoundingClientRect();
    return {y:Math.round(r.y), bg:getComputedStyle(document.body).backgroundColor, color:getComputedStyle(h).color};
  });
  if(st && st.y>150 && st.y<600 && shot<3){ await page.waitForTimeout(400); await page.screenshot({path:SP+`/home-ins-nat-${shot}.png`}); console.log('shot',shot,JSON.stringify(st)); shot++; i+=8; }
  if(shot>=3) break;
}
await browser.close();
