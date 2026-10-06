import { chromium } from 'playwright';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const browser = await chromium.launch();
const L=console.log;
const desc = async (page) => page.evaluate(() => {
  const el=document.activeElement; if(!el||el===document.body) return {none:true};
  const r=el.getBoundingClientRect();
  const cx=Math.min(Math.max(r.x+r.width/2,1),innerWidth-1), cy=Math.min(Math.max(r.y+r.height/2,1),innerHeight-1);
  const top=document.elementFromPoint(cx,cy);
  return { tag:el.tagName.toLowerCase(), text:(el.getAttribute('aria-label')||el.innerText||el.textContent||'').trim().replace(/\s+/g,' ').slice(0,40),
    rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)},
    inViewport: r.top>=-2 && r.bottom<=innerHeight+2 && r.left>=-2 && r.right<=innerWidth+2 && r.width>0,
    anyOverlap: r.bottom>0 && r.top<innerHeight && r.right>0 && r.left<innerWidth,
    inMenu: !!el.closest('#mobile-menu'), inMain: !!el.closest('main'),
    obscuredBy: (top && top!==el && !el.contains(top) && !top.contains(el)) ? top.tagName.toLowerCase()+'.'+(top.className||'').toString().split(' ')[0] : null,
    scrollY: Math.round(scrollY) };
});

// (a) mobile menu focus trap — long tab run
{
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const page=await ctx.newPage(); await page.goto(BASE+'/'); await page.waitForTimeout(900);
  await page.locator('button.hamburger').click(); await page.waitForTimeout(700);
  L('### mobile sheet open — 40 tabs, looking for escape to the page behind');
  let first=null;
  for(let i=0;i<40;i++){
    await page.keyboard.press('Tab');
    const d=await desc(page);
    if(d.none){L(`  ${i+1}. <body>`);continue;}
    if(!d.inMenu && !first) first={i:i+1,d};
    if(!d.inMenu) L(`  ${i+1}. OUTSIDE SHEET -> ${d.tag} "${d.text}" inMain=${d.inMain} obscuredBy=${d.obscuredBy} rect=${JSON.stringify(d.rect)}`);
  }
  if(first) L('  !! focus first left the open sheet at tab '+first.i+': '+JSON.stringify(first.d));
  else L('  focus stayed inside for 40 tabs');
  await page.screenshot({path:SP+'/menu-escape.png'});
  await ctx.close();
}

// (b) offscreen focus on /
{
  const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const page=await ctx.newPage(); await page.goto(BASE+'/'); await page.waitForTimeout(1200);
  L('\n### desktop / — tab stops 9..30, is the focused element actually on screen?');
  for(let i=0;i<30;i++){
    await page.keyboard.press('Tab'); await page.waitForTimeout(120);
    const d=await desc(page);
    if(d.none) continue;
    if(i>=8) L(`  ${i+1}. ${d.tag} "${d.text}" scrollY=${d.scrollY} rect=${JSON.stringify(d.rect)} onScreen=${d.anyOverlap} fullyInView=${d.inViewport} obscuredBy=${d.obscuredBy}`);
    if(i===15||i===19){ await page.screenshot({path:SP+`/focus-stop-${i+1}.png`}); }
  }
  await ctx.close();
}

// (c) reduced-motion off variant: does the page scroll to the focused element?
{
  const ctx=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await ctx.newPage(); await page.goto(BASE+'/'); await page.waitForTimeout(1500);
  L('\n### same, motion ON');
  for(let i=0;i<20;i++){ await page.keyboard.press('Tab'); await page.waitForTimeout(150); }
  const d=await desc(page);
  L('  after 20 tabs: '+JSON.stringify(d));
  await page.screenshot({path:SP+'/focus-motion-20.png'});
  await ctx.close();
}
await browser.close();
