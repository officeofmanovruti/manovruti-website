import { chromium } from 'playwright';
import fs from 'node:fs';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const cand=JSON.parse(fs.readFileSync(SP+'/contrast.json','utf8'));
const browser=await chromium.launch();
const out={};

for(const [p,list] of Object.entries(cand)){
  if(!list.length){ out[p]=[]; continue; }
  const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:2,reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(BASE+p,{waitUntil:'load'}); await page.waitForTimeout(1500);
  await page.addScriptTag({content:`
    window.__decode = (url) => new Promise((res,rej)=>{ const i=new Image(); i.onload=()=>{ const c=document.createElement('canvas'); c.width=i.width;c.height=i.height; const x=c.getContext('2d',{willReadFrequently:true}); x.drawImage(i,0,0); res(x.getImageData(0,0,i.width,i.height).data.buffer); }; i.onerror=rej; i.src=url; });
    window.__px = async (aU,bU) => {
      const [a,b]=await Promise.all([window.__decode(aU),window.__decode(bU)]);
      return {a:Array.from(new Uint8ClampedArray(a)), b:Array.from(new Uint8ClampedArray(b))};
    };
    window.__mark = (tag,txt,cls) => {
      const els=[...document.querySelectorAll(tag)].filter(e=>{
        const t=(e.textContent||'').trim().replace(/\\s+/g,' ');
        return t.startsWith(txt.slice(0,40)) && (e.className||'').toString().slice(0,80)===cls;
      });
      // deepest match only
      const el = els.find(e=>!els.some(o=>o!==e && e.contains(o)));
      if(!el) return null;
      el.setAttribute('data-a11y-probe','1');
      return true;
    };
  `});
  const res=[];
  const done=new Set();
  for(const c of list){
    const key=c.tag+'|'+c.text.slice(0,40)+'|'+c.cls;
    if(done.has(key)) continue; done.add(key);
    const ok=await page.evaluate(([t,x,cl])=>window.__mark(t,x,cl),[c.tag,c.text,c.cls]);
    if(!ok){ res.push({...c, verify:'NOT-FOUND'}); continue; }
    const h=page.locator('[data-a11y-probe="1"]').first();
    let bufA,bufB;
    try{
      await h.scrollIntoViewIfNeeded(); await page.waitForTimeout(350);
      bufA=(await h.screenshot({type:'png'})).toString('base64');
      await page.evaluate(()=>{ const e=document.querySelector('[data-a11y-probe="1"]'); e.dataset.prevColor=e.style.color||''; e.style.setProperty('color','transparent','important'); e.style.setProperty('-webkit-text-fill-color','transparent','important'); e.style.setProperty('text-shadow','none','important'); });
      await page.waitForTimeout(250);
      bufB=(await h.screenshot({type:'png'})).toString('base64');
      await page.evaluate(()=>{ const e=document.querySelector('[data-a11y-probe="1"]'); e.style.removeProperty('color'); e.style.removeProperty('-webkit-text-fill-color'); e.style.removeProperty('text-shadow'); });
    }catch(e){ await page.evaluate(()=>document.querySelector('[data-a11y-probe="1"]')?.removeAttribute('data-a11y-probe')); res.push({...c,verify:'SHOT-FAIL:'+e.message.slice(0,60)}); continue; }

    const m = await page.evaluate(async ({a,b,fontSize,fontWeight})=>{
      const d=await window.__px('data:image/png;base64,'+a,'data:image/png;base64,'+b);
      const A=d.a,B=d.b;
      const srgb=v=>{v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
      const lum=(r,g,bb)=>0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(bb);
      const ratio=(l1,l2)=>{const x=Math.max(l1,l2),y=Math.min(l1,l2);return (x+0.05)/(y+0.05);};
      if(A.length!==B.length) return {err:'size mismatch'};
      const pairs=[];
      for(let i=0;i<A.length;i+=4){
        const dr=Math.abs(A[i]-B[i])+Math.abs(A[i+1]-B[i+1])+Math.abs(A[i+2]-B[i+2]);
        if(dr>24) pairs.push({cov:dr, fl:lum(A[i],A[i+1],A[i+2]), bl:lum(B[i],B[i+1],B[i+2]), fg:[A[i],A[i+1],A[i+2]], bg:[B[i],B[i+1],B[i+2]]});
      }
      if(pairs.length<8) return {err:'no glyph pixels ('+pairs.length+')'};
      // the most fully covered glyph pixels carry the true text colour
      pairs.sort((x,y)=>y.cov-x.cov);
      const core=pairs.slice(0, Math.max(4, Math.floor(pairs.length*0.1)));
      // backdrop: median of all B pixels in the box
      const bls=[]; for(let i=0;i<B.length;i+=4) bls.push(lum(B[i],B[i+1],B[i+2]));
      bls.sort((x,y)=>x-y);
      const bgMed=bls[Math.floor(bls.length/2)];
      const rs=core.map(c=>ratio(c.fl,c.bl)).sort((x,y)=>x-y);
      const median=rs[Math.floor(rs.length/2)];
      const best=rs[rs.length-1];
      const worst=rs[0];
      const sample=core[Math.floor(core.length/2)];
      return { nGlyphPx:pairs.length, measured:Math.round(median*100)/100, bestOfCore:Math.round(best*100)/100, worstOfCore:Math.round(worst*100)/100,
        fgPainted:sample.fg, bgPainted:sample.bg, bgMedianLum:Math.round(bgMed*1000)/1000 };
    },{a:bufA,b:bufB,fontSize:c.fontSize,fontWeight:c.fontWeight});
    await page.evaluate(()=>document.querySelector('[data-a11y-probe="1"]')?.removeAttribute('data-a11y-probe'));
    res.push({...c, verify:m});
  }
  out[p]=res;
  console.log('verified',p,res.length);
  await ctx.close();
}
await browser.close();
fs.writeFileSync(SP+'/contrast2.json',JSON.stringify(out,null,1));
