import { chromium } from 'playwright';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const browser=await chromium.launch();
const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,reducedMotion:'reduce'});
const page=await ctx.newPage();
await page.goto(BASE+'/',{waitUntil:'load'}); await page.waitForTimeout(1500);
await page.addScriptTag({content:`window.__mark=(txt)=>{const els=[...document.querySelectorAll('*')].filter(e=>(e.textContent||'').trim().startsWith(txt));const el=els.find(e=>!els.some(o=>o!==e&&e.contains(o)));if(!el)return null;el.setAttribute('data-a11y-probe','1');return true;};
window.__rect=()=>{const e=document.querySelector('[data-a11y-probe="1"]');if(!e)return null;const r=e.getBoundingClientRect();return{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),sy:Math.round(scrollY)};};`});
await page.evaluate(()=>window.__mark('What a project management consultant actually does'));
let r;
for(let i=0;i<16;i++){ r=await page.evaluate(()=>window.__rect()); const d=r.y-350; if(Math.abs(d)<25) break; await page.evaluate(y=>scrollTo(0,Math.max(0,y)),r.sy+d); await page.waitForTimeout(500); }
// settle
await page.waitForTimeout(2500);
r=await page.evaluate(()=>window.__rect());
console.log('rect',JSON.stringify(r));
console.log('body data', JSON.stringify(await page.evaluate(()=>({cur:document.body.dataset.backgroundCurrent,txt:document.body.dataset.text,bg:getComputedStyle(document.body).backgroundColor}))));
await page.screenshot({path:SP+'/home-insights.png'});
await browser.close();
