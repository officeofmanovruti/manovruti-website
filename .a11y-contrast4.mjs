import { chromium } from 'playwright';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const browser=await chromium.launch();
const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:2,reducedMotion:'reduce'});
const page=await ctx.newPage();
await page.goto(BASE+'/contact',{waitUntil:'load'}); await page.waitForTimeout(1500);
// slow human-like scroll so ScrollTrigger fires
await page.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=200){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,80)); } });
await page.waitForTimeout(800);
const info = await page.evaluate(()=>{
  const els=[...document.querySelectorAll('p')].filter(e=>(e.textContent||'').trim().startsWith('Institution of Engineers'));
  return els.map(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);
    let op=1;for(let m=e;m&&m!==document.documentElement;m=m.parentElement)op*=parseFloat(getComputedStyle(m).opacity||'1');
    return {rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)},color:cs.color,chainOpacity:op,scrollY:Math.round(scrollY)};});
});
console.log(JSON.stringify(info));
const el = page.locator('p:text-is("Institution of Engineers (India), Kolkata")').first();
await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(900);
await el.screenshot({path:SP+'/probe-credential.png'});
const r2 = await page.evaluate(()=>{const e=[...document.querySelectorAll('p')].find(x=>(x.textContent||'').trim().startsWith('Institution of Engineers'));const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),scrollY:Math.round(scrollY)};});
console.log('rect after scrollIntoView:',JSON.stringify(r2));
await page.screenshot({path:SP+'/probe-credential-vp.png', clip:{x:Math.max(0,r2.x-40),y:Math.max(0,r2.y-60),width:Math.min(600,1280-Math.max(0,r2.x-40)),height:160}});
await browser.close();
