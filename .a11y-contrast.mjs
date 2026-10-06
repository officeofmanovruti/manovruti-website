import { chromium } from 'playwright';
import fs from 'node:fs';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const PAGES=['/','/about','/portfolio','/insights','/contact','/thank-you','/privacy','/services/structural-detail-engineering','/insights/na-permission-dnh'];

const browser=await chromium.launch();
const results={};

for(const p of PAGES){
  const ctx=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(BASE+p,{waitUntil:'load'}); await page.waitForTimeout(1200);

  // helper installed once
  await page.addScriptTag({content:`
    window.__resolveColor = (css) => {
      const c=document.createElement('canvas'); c.width=c.height=1;
      const x=c.getContext('2d',{willReadFrequently:true});
      x.clearRect(0,0,1,1);
      x.fillStyle='#000'; // baseline
      x.fillStyle=css;    // if unparsable it stays #000 -> flag it
      const applied=x.fillStyle;
      x.clearRect(0,0,1,1);
      x.fillStyle=css; x.fillRect(0,0,1,1);
      const d=x.getImageData(0,0,1,1).data;
      return {r:d[0],g:d[1],b:d[2],a:d[3]/255,applied};
    };
    window.__loadShots = async (aUrl,bUrl) => {
      const mk = (url)=>new Promise((res,rej)=>{const i=new Image(); i.onload=()=>res(i); i.onerror=rej; i.src=url;});
      const [ia,ib]=await Promise.all([mk(aUrl),mk(bUrl)]);
      const c1=document.createElement('canvas'); c1.width=ia.width; c1.height=ia.height;
      const c2=document.createElement('canvas'); c2.width=ib.width; c2.height=ib.height;
      c1.getContext('2d',{willReadFrequently:true}).drawImage(ia,0,0);
      c2.getContext('2d',{willReadFrequently:true}).drawImage(ib,0,0);
      window.__A=c1.getContext('2d',{willReadFrequently:true});
      window.__B=c2.getContext('2d',{willReadFrequently:true});
      return [ia.width,ia.height];
    };
  `});

  const pageH = await page.evaluate(()=>Math.max(document.body.scrollHeight,document.documentElement.scrollHeight));
  const steps = Math.min(14, Math.ceil(pageH/700));
  const found=[]; const seen=new Set();

  for(let s=0;s<steps;s++){
    await page.evaluate(y=>window.scrollTo(0,y), s*700);
    await page.waitForTimeout(500);
    const a = (await page.screenshot({type:'png'})).toString('base64');
    await page.addStyleTag({content:'*,*::before,*::after{color:transparent !important;-webkit-text-fill-color:transparent !important;text-shadow:none !important;text-decoration-color:transparent !important;}', id:'__hidetext'});
    await page.waitForTimeout(250);
    const b = (await page.screenshot({type:'png'})).toString('base64');
    await page.evaluate(()=>{ [...document.querySelectorAll('style')].forEach(s=>{ if(s.textContent.includes('-webkit-text-fill-color: transparent !important') || s.textContent.includes('-webkit-text-fill-color:transparent !important')) s.remove(); }); });
    await page.waitForTimeout(250);

    const batch = await page.evaluate(async ({a,b})=>{
      await window.__loadShots('data:image/png;base64,'+a,'data:image/png;base64,'+b);
      const A=window.__A, B=window.__B;
      const srgb=(v)=>{v/=255; return v<=0.04045? v/12.92 : Math.pow((v+0.055)/1.055,2.4);};
      const lum=(r,g,bb)=>0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(bb);
      const ratio=(l1,l2)=>{const a=Math.max(l1,l2),b2=Math.min(l1,l2);return (a+0.05)/(b2+0.05);};
      const out=[];
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      const els=new Set();
      let n; while((n=walker.nextNode())){ if(n.nodeValue && n.nodeValue.trim().length>1) els.add(n.parentElement); }
      for(const el of els){
        if(!el) continue;
        if(el.closest('[aria-hidden="true"]')) continue;
        const cs=getComputedStyle(el);
        if(cs.visibility==='hidden'||cs.display==='none') continue;
        // cumulative opacity + hidden ancestors
        let op=1, hid=false;
        for(let m=el;m && m!==document.documentElement;m=m.parentElement){
          const c=getComputedStyle(m);
          if(c.display==='none'||c.visibility==='hidden'){hid=true;break;}
          op*=parseFloat(c.opacity||'1');
        }
        if(hid||op<0.02) continue;
        const r=el.getBoundingClientRect();
        if(r.width<4||r.height<4) continue;
        if(r.top<2||r.bottom>innerHeight-2||r.left<0||r.right>innerWidth) continue;
        // own text box: clip to a band around the text
        const x0=Math.max(0,Math.floor(r.left)), y0=Math.max(0,Math.floor(r.top));
        const w=Math.min(Math.floor(r.width), innerWidth-x0), h=Math.min(Math.floor(r.height), innerHeight-y0);
        if(w<4||h<4) continue;
        const fgRaw=window.__resolveColor(cs.color);
        const unresolved = (cs.color.includes('oklab')||cs.color.includes('oklch')||cs.color.includes('color(')) && fgRaw.r===0&&fgRaw.g===0&&fgRaw.b===0;
        const alpha=fgRaw.a*op;
        if(alpha<0.02) continue;

        const da=A.getImageData(x0,y0,w,h).data;
        const db=B.getImageData(x0,y0,w,h).data;
        // pixels where text was painted
        let diffCount=0;
        let worst=null, worstRatio=Infinity;
        const lums=[];
        for(let i=0;i<da.length;i+=4){
          const dr=Math.abs(da[i]-db[i])+Math.abs(da[i+1]-db[i+1])+Math.abs(da[i+2]-db[i+2]);
          if(dr>18){ // this pixel carries glyph ink
            diffCount++;
            const bl=lum(db[i],db[i+1],db[i+2]);
            // composite the declared fg (canvas-resolved) at its effective alpha over the real backdrop
            const fr=fgRaw.r*alpha+db[i]*(1-alpha), fg2=fgRaw.g*alpha+db[i+1]*(1-alpha), fb=fgRaw.b*alpha+db[i+2]*(1-alpha);
            const fl=lum(fr,fg2,fb);
            const cr=ratio(fl,bl);
            lums.push(cr);
            if(cr<worstRatio){ worstRatio=cr; worst={bg:[db[i],db[i+1],db[i+2]],fg:[Math.round(fr),Math.round(fg2),Math.round(fb)]}; }
          }
        }
        if(diffCount<6) continue;
        lums.sort((x,y)=>x-y);
        const p5=lums[Math.floor(lums.length*0.05)];
        const median=lums[Math.floor(lums.length*0.5)];
        const fs=parseFloat(cs.fontSize), fw=parseInt(cs.fontWeight)||400;
        const large = fs>=24 || (fs>=18.66 && fw>=700);
        const need = large?3:4.5;
        if(p5 < need){
          out.push({ text:(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,60),
            tag:el.tagName.toLowerCase(), cls:(el.className&&el.className.toString?el.className.toString():'').slice(0,80),
            color:cs.color, opacityChain:Math.round(op*1000)/1000, fontSize:fs, fontWeight:fw, large,
            need, p5:Math.round(p5*100)/100, median:Math.round(median*100)/100, worst:Math.round(worstRatio*100)/100,
            bgSample:worst?worst.bg:null, fgEffective:worst?worst.fg:null, unresolved,
            selPath:(()=>{const q=[];let m=el;while(m&&m!==document.body){q.unshift(m.tagName.toLowerCase()+(m.id?'#'+m.id:''));m=m.parentElement;}return q.slice(-4).join('>');})() });
        }
      }
      return out;
    },{a,b});
    for(const f of batch){ const k=f.tag+'|'+f.text+'|'+f.p5; if(seen.has(k))continue; seen.add(k); found.push(f); }
  }
  results[p]=found;
  console.log('done',p,found.length);
  await ctx.close();
}
await browser.close();
fs.writeFileSync(SP+'/contrast.json',JSON.stringify(results,null,1));
