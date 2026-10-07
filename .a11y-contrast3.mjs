import { chromium } from 'playwright';
import fs from 'node:fs';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const prev=JSON.parse(fs.readFileSync(SP+'/contrast2.json','utf8'));
const browser=await chromium.launch();
const out={};
for(const [p,list] of Object.entries(prev)){
  const todo=list.filter(e=>typeof e.verify==='string'||e.verify?.err);
  if(!todo.length) continue;
  const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(BASE+p,{waitUntil:'load'}); await page.waitForTimeout(1500);
  await page.addScriptTag({content:`
    window.__decode=(url)=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(i,0,0);res({d:x.getImageData(0,0,i.width,i.height),w:i.width,h:i.height});};i.onerror=rej;i.src=url;});
    window.__mark=(tag,txt,cls)=>{const els=[...document.querySelectorAll(tag)].filter(e=>{const t=(e.textContent||'').trim().replace(/\\s+/g,' ');return t.startsWith(txt.slice(0,30))&&(e.className||'').toString().slice(0,80)===cls;});const el=els.find(e=>!els.some(o=>o!==e&&e.contains(o)));if(!el)return null;el.setAttribute('data-a11y-probe','1');return true;};
  `});
  const res=[];
  for(const c of todo){
    const ok=await page.evaluate(([t,x,cl])=>window.__mark(t,x,cl),[c.tag,c.text,c.cls]);
    if(!ok){ res.push({...c,verify2:'NOT-FOUND'}); continue; }
    try{
      await page.locator('[data-a11y-probe="1"]').first().scrollIntoViewIfNeeded(); await page.waitForTimeout(600);
      const rect = await page.evaluate(()=>{const e=document.querySelector('[data-a11y-probe="1"]');const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};});
      const a=(await page.screenshot({type:'png'})).toString('base64');
      await page.evaluate(()=>{const e=document.querySelector('[data-a11y-probe="1"]');e.style.setProperty('color','transparent','important');e.style.setProperty('-webkit-text-fill-color','transparent','important');
        e.querySelectorAll('*').forEach(k=>{k.style.setProperty('color','transparent','important');k.style.setProperty('-webkit-text-fill-color','transparent','important');});});
      await page.waitForTimeout(350);
      const b=(await page.screenshot({type:'png'})).toString('base64');
      await page.evaluate(()=>{const e=document.querySelector('[data-a11y-probe="1"]');e.style.removeProperty('color');e.style.removeProperty('-webkit-text-fill-color');e.querySelectorAll('*').forEach(k=>{k.style.removeProperty('color');k.style.removeProperty('-webkit-text-fill-color');});});
      const m=await page.evaluate(async ({a,b,rect})=>{
        const [A,B]=await Promise.all([window.__decode('data:image/png;base64,'+a),window.__decode('data:image/png;base64,'+b)]);
        const srgb=v=>{v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
        const lum=(r,g,bb)=>0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(bb);
        const ratio=(l1,l2)=>{const x=Math.max(l1,l2),y=Math.min(l1,l2);return (x+0.05)/(y+0.05);};
        const x0=Math.max(0,rect.x),y0=Math.max(0,rect.y),w=Math.min(rect.w,A.w-x0),h=Math.min(rect.h,A.h-y0);
        if(w<2||h<2) return {err:'offscreen rect'};
        const da=A.d.data,db=B.d.data,W=A.w;
        const pairs=[];
        for(let yy=y0;yy<y0+h;yy++)for(let xx=x0;xx<x0+w;xx++){
          const i=(yy*W+xx)*4;
          const dr=Math.abs(da[i]-db[i])+Math.abs(da[i+1]-db[i+1])+Math.abs(da[i+2]-db[i+2]);
          if(dr>24) pairs.push({cov:dr,fl:lum(da[i],da[i+1],da[i+2]),bl:lum(db[i],db[i+1],db[i+2]),fg:[da[i],da[i+1],da[i+2]],bg:[db[i],db[i+1],db[i+2]]});
        }
        if(pairs.length<6) return {err:'no glyph pixels ('+pairs.length+')'};
        pairs.sort((x,y)=>y.cov-x.cov);
        const core=pairs.slice(0,Math.max(3,Math.floor(pairs.length*0.1)));
        const rs=core.map(c=>ratio(c.fl,c.bl)).sort((x,y)=>x-y);
        const s=core[Math.floor(core.length/2)];
        return {nGlyphPx:pairs.length,measured:Math.round(rs[Math.floor(rs.length/2)]*100)/100,fgPainted:s.fg,bgPainted:s.bg};
      },{a,b,rect});
      res.push({...c,verify2:m});
    }catch(e){ res.push({...c,verify2:'ERR:'+e.message.slice(0,60)}); }
    await page.evaluate(()=>document.querySelector('[data-a11y-probe="1"]')?.removeAttribute('data-a11y-probe'));
  }
  out[p]=res; console.log('pass3',p,res.length);
  await ctx.close();
}
await browser.close();
fs.writeFileSync(SP+'/contrast3.json',JSON.stringify(out,null,1));
for(const [p,l] of Object.entries(out)){ console.log('\n== '+p);
  l.forEach(e=>{const v=e.verify2; if(typeof v==='string'||v.err) console.log('   STILL-UNVERIFIED ('+(v.err||v)+')  '+JSON.stringify(e.text.slice(0,45)));
    else console.log('   '+(v.measured<e.need?'FAIL':'pass')+' measured='+v.measured+' need '+e.need+'  '+e.fontSize+'px  fg=rgb('+v.fgPainted.join(',')+') bg=rgb('+v.bgPainted.join(',')+')  '+JSON.stringify(e.text.slice(0,45)));});
}
