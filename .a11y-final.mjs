import { chromium } from 'playwright';
import fs from 'node:fs';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const c2=JSON.parse(fs.readFileSync(SP+'/contrast2.json','utf8'));
const c5=JSON.parse(fs.readFileSync(SP+'/contrast5.json','utf8'));
const cands={};
for(const [p,l] of Object.entries(c2)) cands[p]=l.filter(e=>e.verify&&e.verify.measured!==undefined);
for(const [p,l] of Object.entries(c5)) cands[p]=(cands[p]||[]).concat(l.filter(e=>e.verify3&&e.verify3.measured!==undefined));
const browser=await chromium.launch();
const out={};
for(const [p,list] of Object.entries(cands)){
  if(!list||!list.length) continue;
  const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:2});
  const page=await ctx.newPage();
  await page.goto(BASE+p,{waitUntil:'load'}); await page.waitForTimeout(1600);
  await page.addScriptTag({content:`
    window.__decode=(url)=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(i,0,0);res({d:x.getImageData(0,0,i.width,i.height),w:i.width,h:i.height});};i.onerror=rej;i.src=url;});
    window.__mark=(tag,txt,cls)=>{document.querySelectorAll('[data-a11y-probe]').forEach(e=>e.removeAttribute('data-a11y-probe'));
      const els=[...document.querySelectorAll(tag)].filter(e=>{const t=(e.textContent||'').trim().replace(/\\s+/g,' ');return t.startsWith(txt.slice(0,30))&&(e.className||'').toString().slice(0,80)===cls;});
      const el=els.find(e=>!els.some(o=>o!==e&&e.contains(o)));if(!el)return null;el.setAttribute('data-a11y-probe','1');return true;};
    window.__rect=()=>{const e=document.querySelector('[data-a11y-probe="1"]');if(!e)return null;const r=e.getBoundingClientRect();return{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),sy:Math.round(scrollY)};};
  `});
  // natural wheel scroll, stopping at each candidate when it lands mid-viewport
  const res=[]; const seen=new Set();
  const pending=list.filter(c=>{const k=c.tag+'|'+c.text.slice(0,30)+'|'+c.cls; if(seen.has(k))return false; seen.add(k); return true;});
  const remaining=new Set(pending.map((_,i)=>i));
  let guard=0;
  await page.evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(700);
  while(remaining.size && guard++<420){
    await page.mouse.wheel(0,140); await page.waitForTimeout(32);
    for(const idx of [...remaining]){
      const c=pending[idx];
      const ok=await page.evaluate(([t,x,cl])=>window.__mark(t,x,cl),[c.tag,c.text,c.cls]);
      if(!ok) continue;
      const r=await page.evaluate(()=>window.__rect());
      if(!r||r.y<80||r.y+r.h>720||r.w<4||r.h<4) continue;
      await page.waitForTimeout(500);
      const r2=await page.evaluate(()=>window.__rect());
      if(!r2||r2.y<80||r2.y+r2.h>720) continue;
      const a=(await page.screenshot({type:'png'})).toString('base64');
      await page.evaluate(()=>{const e=document.querySelector('[data-a11y-probe="1"]');e.style.setProperty('color','transparent','important');e.style.setProperty('-webkit-text-fill-color','transparent','important');e.querySelectorAll('*').forEach(k=>{k.style.setProperty('color','transparent','important');k.style.setProperty('-webkit-text-fill-color','transparent','important');});});
      await page.waitForTimeout(260);
      const b=(await page.screenshot({type:'png'})).toString('base64');
      await page.evaluate(()=>{const e=document.querySelector('[data-a11y-probe="1"]');e.style.removeProperty('color');e.style.removeProperty('-webkit-text-fill-color');e.querySelectorAll('*').forEach(k=>{k.style.removeProperty('color');k.style.removeProperty('-webkit-text-fill-color');});});
      const m=await page.evaluate(async({a,b,rect,dpr})=>{
        const [A,B]=await Promise.all([window.__decode('data:image/png;base64,'+a),window.__decode('data:image/png;base64,'+b)]);
        const srgb=v=>{v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
        const lum=(r,g,bb)=>0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(bb);
        const ratio=(l1,l2)=>{const x=Math.max(l1,l2),y=Math.min(l1,l2);return (x+0.05)/(y+0.05);};
        const s=dpr, da=A.d.data, db=B.d.data, W=A.w;
        const pairs=[];
        for(let yy=Math.round(rect.y*s);yy<Math.round((rect.y+rect.h)*s);yy++)
          for(let xx=Math.round(rect.x*s);xx<Math.round((rect.x+rect.w)*s);xx++){
            const i=(yy*W+xx)*4;
            const dr=Math.abs(da[i]-db[i])+Math.abs(da[i+1]-db[i+1])+Math.abs(da[i+2]-db[i+2]);
            if(dr>24) pairs.push({cov:dr,fl:lum(da[i],da[i+1],da[i+2]),bl:lum(db[i],db[i+1],db[i+2]),fg:[da[i],da[i+1],da[i+2]],bg:[db[i],db[i+1],db[i+2]]});
          }
        if(pairs.length<8) return {err:'no glyph pixels ('+pairs.length+')'};
        pairs.sort((x,y)=>y.cov-x.cov);
        const core=pairs.slice(0,Math.max(4,Math.floor(pairs.length*0.08)));
        const rs=core.map(c=>ratio(c.fl,c.bl)).sort((x,y)=>x-y);
        const mid=core[Math.floor(core.length/2)];
        return {n:pairs.length, measured:Math.round(rs[Math.floor(rs.length/2)]*100)/100, fg:mid.fg, bg:mid.bg};
      },{a,b,rect:r2,dpr:2});
      res.push({page:p,text:c.text,tag:c.tag,fontSize:c.fontSize,fontWeight:c.fontWeight,need:c.need,color:c.color,chainOpacity:c.opacityChain,final:m});
      remaining.delete(idx);
    }
    const atEnd=await page.evaluate(()=>scrollY+innerHeight>=document.body.scrollHeight-5);
    if(atEnd){ await page.evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(800); if(guard>300) break; }
  }
  for(const idx of remaining) res.push({page:p,text:pending[idx].text,final:'NOT-REACHED'});
  out[p]=res; console.log('final',p,res.length,'unreached',remaining.size);
  await ctx.close();
}
await browser.close();
fs.writeFileSync(SP+'/final.json',JSON.stringify(out,null,1));
