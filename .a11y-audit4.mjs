import { chromium } from 'playwright';
import fs from 'node:fs';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const PAGES=['/','/about','/portfolio','/insights','/contact','/thank-you','/privacy','/services/structural-detail-engineering','/insights/na-permission-dnh'];
const browser=await chromium.launch();
const all={};
for(const p of PAGES){
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(BASE+p,{waitUntil:'load'}); await page.waitForTimeout(900);
  // scroll the whole page so lazy/pinned sections lay out, then back
  await page.evaluate(async()=>{ const h=document.body.scrollHeight; for(let y=0;y<h;y+=600){ scrollTo(0,y); await new Promise(r=>setTimeout(r,60)); } scrollTo(0,0); });
  await page.waitForTimeout(800);

  const res = await page.evaluate(() => {
    const SEL='a[href],button:not([disabled]),input:not([type=hidden]),select,textarea,summary,[tabindex]:not([tabindex="-1"])';
    const out=[];
    for(const el of document.querySelectorAll(SEL)){
      const cs=getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden'||cs.opacity==='0') continue;
      if(el.closest('[aria-hidden="true"]')) continue;
      // skip anything inside a hidden ancestor
      let hid=false; for(let n=el; n; n=n.parentElement){ const c=getComputedStyle(n); if(c.display==='none'||c.visibility==='hidden'){hid=true;break;} }
      if(hid) continue;
      const r=el.getBoundingClientRect();
      if(r.width===0&&r.height===0) continue;
      // WCAG 2.2 2.5.8: the target, or the spacing circle. Report raw box.
      out.push({ tag:el.tagName.toLowerCase(),
        text:(el.getAttribute('aria-label')||el.innerText||el.textContent||el.getAttribute('title')||'').trim().replace(/\s+/g,' ').slice(0,46),
        href:(el.getAttribute('href')||'').slice(0,48),
        w:Math.round(r.width*10)/10, h:Math.round(r.height*10)/10,
        cls:(el.className&&el.className.toString?el.className.toString():'').slice(0,70),
        inHeader:!!el.closest('header'), inFooter:!!el.closest('footer'), inMenu:!!el.closest('#mobile-menu'),
        inline: (()=>{ // is it inline text inside a sentence? (2.5.8 exception)
          const pr=el.parentElement; if(!pr) return false;
          const d=getComputedStyle(el).display;
          if(d!=='inline'&&d!=='inline-block') return false;
          const t=(pr.textContent||'').trim(), own=(el.textContent||'').trim();
          return t.length>own.length+8; })(),
      });
    }
    return out;
  });
  all[p]=res;

  // open the mobile sheet and measure its targets too
  const burger = page.locator('button.hamburger');
  if(await burger.count()){
    await burger.click(); await page.waitForTimeout(600);
    // expand the first accordion
    const acc=page.locator('#mobile-menu button[aria-expanded]').first();
    if(await acc.count()){ await acc.click(); await page.waitForTimeout(600); }
    const menu = await page.evaluate(()=>{
      const out=[];
      for(const el of document.querySelectorAll('#mobile-menu a[href],#mobile-menu button')){
        const r=el.getBoundingClientRect(); const cs=getComputedStyle(el);
        if(cs.display==='none'||cs.visibility==='hidden') continue;
        if(r.width===0&&r.height===0) continue;
        out.push({tag:el.tagName.toLowerCase(),text:(el.getAttribute('aria-label')||el.textContent||'').trim().replace(/\s+/g,' ').slice(0,40),w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10});
      }
      return out;
    });
    all[p+' [mobile sheet]']=menu;
  }
  console.log('done',p);
  await ctx.close();
}
await browser.close();
fs.writeFileSync(SP+'/res4.json',JSON.stringify(all,null,1));
