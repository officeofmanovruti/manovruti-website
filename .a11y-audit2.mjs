import { chromium } from 'playwright';
import fs from 'node:fs';
const BASE='http://localhost:3000';
const SP='/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad';
const browser = await chromium.launch();
const log = [];
const L = (...a)=>{ const s=a.join(' '); log.push(s); console.log(s); };

const desc = async (page) => page.evaluate(() => {
  const el = document.activeElement;
  if (!el || el === document.body) return { none: true };
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return {
    tag: el.tagName.toLowerCase(),
    text: (el.getAttribute('aria-label') || el.innerText || el.textContent || '').trim().replace(/\s+/g,' ').slice(0,48),
    href: el.getAttribute('href'),
    cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0,50),
    rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    inViewport: r.top >= -2 && r.bottom <= window.innerHeight + 2 && r.width>0 && r.height>0,
    outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor,
    boxShadow: cs.boxShadow.slice(0,60),
    visibility: cs.visibility, display: cs.display, opacity: cs.opacity,
    inMobileMenu: !!el.closest('#mobile-menu'),
    inHeader: !!el.closest('header'),
    inMain: !!el.closest('main'),
    ariaHiddenAncestor: !!el.closest('[aria-hidden="true"]'),
    path: (()=>{ const p=[]; let n=el; while(n && n!==document.body){ p.unshift(n.tagName.toLowerCase()+(n.id?'#'+n.id:'')); n=n.parentElement; } return p.slice(-4).join('>'); })(),
  };
});

// ---------- 1. Desktop tab order on /
{
  const ctx = await browser.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE+'/'); await page.waitForTimeout(900);
  L('\n##### DESKTOP 1440 — first 24 tab stops on /');
  await page.evaluate(()=>window.scrollTo(0,0));
  for (let i=0;i<24;i++){
    await page.keyboard.press('Tab');
    const d = await desc(page);
    if (d.none) { L(`  ${i+1}. <body / none>`); continue; }
    L(`  ${i+1}. ${d.tag} "${d.text}" href=${d.href} rect=${d.rect.x},${d.rect.y} ${d.rect.w}x${d.rect.h} vis=${d.visibility} op=${d.opacity} outline="${d.outline}" ${d.ariaHiddenAncestor?'ARIA-HIDDEN-ANCESTOR':''} ${d.inViewport?'':'OFFSCREEN'}`);
  }
  // Skip link check
  L('\n##### SKIP LINK on / (focus first element)');
  await page.evaluate(()=>{ document.activeElement?.blur?.(); window.scrollTo(0,0); });
  await page.keyboard.press('Tab');
  // hmm Tab from body continues from last; reload
  await page.reload(); await page.waitForTimeout(700);
  await page.keyboard.press('Tab');
  const sk = await page.evaluate(()=>{
    const el=document.activeElement; const r=el.getBoundingClientRect(); const cs=getComputedStyle(el);
    // what is painted on top at the skip link's centre?
    const cx=r.x+r.width/2, cy=r.y+r.height/2;
    const top=document.elementFromPoint(cx,cy);
    return { text:el.textContent.trim(), rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)},
      pos:cs.position, clip:cs.clip, zIndex:cs.zIndex, bg:cs.backgroundColor, color:cs.color,
      topElementAtCentre: top ? top.tagName.toLowerCase()+'.'+(top.className||'').toString().split(' ')[0] : null,
      topIsSelf: top===el || el.contains(top) };
  });
  L('  '+JSON.stringify(sk));
  await page.screenshot({ path: SP+'/skiplink.png', clip: {x:0,y:0,width:700,height:140} });

  // ---------- Desktop services dropdown by keyboard
  L('\n##### DESKTOP SERVICES DROPDOWN (keyboard)');
  await page.reload(); await page.waitForTimeout(700);
  const navLink = page.locator('nav[aria-label="Primary"] a[aria-expanded]').first();
  await navLink.focus();
  await page.waitForTimeout(400);
  L('  after .focus() on Services link: aria-expanded='+await navLink.getAttribute('aria-expanded'));
  let panelVis = await page.evaluate(()=>{
    const a=document.querySelector('nav[aria-label="Primary"] a[aria-expanded]');
    const panel=a.parentElement.querySelector('div');
    const cs=getComputedStyle(panel);
    return {visibility:cs.visibility, opacity:cs.opacity, links:panel.querySelectorAll('a').length};
  });
  L('  panel: '+JSON.stringify(panelVis));
  // Tab into panel
  for (let i=0;i<3;i++){ await page.keyboard.press('Tab'); const d=await desc(page); L(`   Tab+${i+1}: ${d.tag} "${d.text}" href=${d.href} vis=${d.visibility} inHeader=${d.inHeader}`); }
  // Escape
  await navLink.focus(); await page.waitForTimeout(300);
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  L('  after Escape: aria-expanded='+await navLink.getAttribute('aria-expanded'));
  const d2 = await desc(page); L('  focus after Escape: '+d2.tag+' "'+d2.text+'"');
  // Enter on the Services link = navigates?
  L('  NOTE: Services toggle is <a href='+await navLink.getAttribute('href')+'> — Enter navigates rather than toggling.');
  await ctx.close();
}

// ---------- 2. Mobile 390 — menu focus management
{
  const ctx = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'reduce', isMobile:false });
  const page = await ctx.newPage();
  await page.goto(BASE+'/'); await page.waitForTimeout(900);
  L('\n##### MOBILE 390 — hamburger / mobile menu focus management');
  const burger = page.locator('button.hamburger');
  await burger.focus();
  const before = await desc(page);
  L('  focus before open: '+before.tag+' "'+before.text+'"');
  await page.keyboard.press('Enter'); await page.waitForTimeout(700);
  L('  aria-expanded after Enter: '+await burger.getAttribute('aria-expanded'));
  const afterOpen = await desc(page);
  L('  focus AFTER open: '+afterOpen.tag+' "'+afterOpen.text+'" inMobileMenu='+afterOpen.inMobileMenu);
  L('  menu visible: '+JSON.stringify(await page.evaluate(()=>{const m=document.getElementById('mobile-menu');const cs=getComputedStyle(m);return{visibility:cs.visibility,opacity:cs.opacity,ariaHidden:m.getAttribute('aria-hidden')};})));
  // Tab through — does focus stay inside? (focus trap test)
  L('  tabbing 12 times from the hamburger while the sheet is open:');
  let escaped = false;
  for (let i=0;i<12;i++){
    await page.keyboard.press('Tab');
    const d = await desc(page);
    if (d.none) { L(`    ${i+1}. <none>`); continue; }
    if (!d.inMobileMenu) escaped = true;
    L(`    ${i+1}. ${d.tag} "${d.text}" inMenu=${d.inMobileMenu} inMain=${d.inMain} vis=${d.visibility} y=${d.rect.y} ${d.inViewport?'':'OFFSCREEN'}`);
  }
  L('  => focus LEFT the open sheet: '+escaped);
  // Escape -> focus restored?
  await page.keyboard.press('Escape'); await page.waitForTimeout(600);
  const afterEsc = await desc(page);
  L('  aria-expanded after Escape: '+await burger.getAttribute('aria-expanded'));
  L('  focus after Escape: '+(afterEsc.none?'<body — LOST>':afterEsc.tag+' "'+afterEsc.text+'" inMenu='+afterEsc.inMobileMenu));
  // reopen, click close button, check restore
  await burger.click(); await page.waitForTimeout(600);
  await page.locator('#mobile-menu button[aria-label="Close menu"]').click(); await page.waitForTimeout(600);
  const afterClose = await desc(page);
  L('  focus after clicking Close: '+(afterClose.none?'<body — LOST>':afterClose.tag+' "'+afterClose.text+'"'));
  // page behind scrollable while open?
  await burger.click(); await page.waitForTimeout(500);
  L('  body overflow while open: '+await page.evaluate(()=>getComputedStyle(document.body).overflow));
  await page.keyboard.press('Escape'); await page.waitForTimeout(400);

  // mobile accordion
  L('\n##### MOBILE accordion inside the sheet');
  await burger.click(); await page.waitForTimeout(600);
  const acc = page.locator('#mobile-menu button[aria-expanded]').first();
  await acc.focus();
  await page.keyboard.press('Enter'); await page.waitForTimeout(600);
  L('  accordion aria-expanded after Enter: '+await acc.getAttribute('aria-expanded')+' aria-controls='+await acc.getAttribute('aria-controls'));
  const sub = await page.evaluate(()=>{
    const b=document.querySelector('#mobile-menu button[aria-expanded]');
    const wrap=b.nextElementSibling;
    const cs=getComputedStyle(wrap);
    const first=wrap.querySelector('a');
    const fr=first?first.getBoundingClientRect():null;
    return { rows:cs.gridTemplateRows, firstLinkH: fr?Math.round(fr.height):null, firstLinkText:first?first.textContent.trim():null };
  });
  L('  expanded panel: '+JSON.stringify(sub));
  await page.keyboard.press('Space'); await page.waitForTimeout(500);
  L('  accordion aria-expanded after Space: '+await acc.getAttribute('aria-expanded'));
  // collapsed sub-links still focusable?
  const collapsedFocusable = await page.evaluate(()=>{
    const b=document.querySelector('#mobile-menu button[aria-expanded]');
    const wrap=b.nextElementSibling;
    const cs=getComputedStyle(wrap);
    const links=[...wrap.querySelectorAll('a')];
    return { rows:cs.gridTemplateRows, n:links.length,
      firstRect: links[0]? (()=>{const r=links[0].getBoundingClientRect(); return Math.round(r.width)+'x'+Math.round(r.height);})() : null,
      firstVisibility: links[0]?getComputedStyle(links[0]).visibility:null,
      textContentExposed: links.map(l=>l.textContent.trim()).slice(0,3) };
  });
  L('  COLLAPSED sub-list: '+JSON.stringify(collapsedFocusable));
  // tab from the collapsed accordion button
  await acc.focus(); await page.keyboard.press('Tab');
  const nxt = await desc(page);
  L('  Tab from collapsed accordion button lands on: '+nxt.tag+' "'+nxt.text+'" rect='+JSON.stringify(nxt.rect)+' vis='+nxt.visibility);
  await ctx.close();
}

// ---------- 3. Closed mobile menu reachable at desktop? / closed desktop panel at mobile?
{
  const ctx = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE+'/'); await page.waitForTimeout(800);
  L('\n##### MOBILE 390 — tab stops with the sheet CLOSED (do hidden sheet links get focus?)');
  for (let i=0;i<10;i++){
    await page.keyboard.press('Tab');
    const d = await desc(page);
    if(d.none){L(`  ${i+1}. none`);continue;}
    L(`  ${i+1}. ${d.tag} "${d.text}" inMenu=${d.inMobileMenu} vis=${d.visibility} y=${d.rect.y}`);
  }
  await ctx.close();
}

// ---------- 4. FAQ accordion keyboard on /contact
{
  const ctx = await browser.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE+'/contact'); await page.waitForTimeout(1000);
  L('\n##### /contact FAQ accordion keyboard');
  const q2 = page.locator('button[aria-controls="faq-1"]');
  await q2.scrollIntoViewIfNeeded(); await q2.focus();
  const f = await desc(page);
  L('  focused: '+f.tag+' "'+f.text+'" outline="'+f.outline+'"');
  await page.keyboard.press('Enter'); await page.waitForTimeout(600);
  L('  after Enter aria-expanded='+await q2.getAttribute('aria-expanded'));
  await page.keyboard.press('Space'); await page.waitForTimeout(600);
  L('  after Space aria-expanded='+await q2.getAttribute('aria-expanded'));
  const reg = await page.evaluate(()=>{
    const r=document.getElementById('faq-1');
    const cs=getComputedStyle(r);
    return { role:r.getAttribute('role'), label:r.getAttribute('aria-label'), labelledby:r.getAttribute('aria-labelledby'),
      rows:cs.gridTemplateRows, h:Math.round(r.getBoundingClientRect().height),
      textStillInTree:(r.textContent||'').trim().slice(0,50) };
  });
  L('  collapsed region: '+JSON.stringify(reg));
  // portfolio filters
  await page.goto(BASE+'/portfolio'); await page.waitForTimeout(1000);
  L('\n##### /portfolio sector filters keyboard');
  const filters = page.locator('button[aria-pressed]');
  const n = await filters.count(); L('  filter buttons: '+n);
  const f2 = filters.nth(2);
  await f2.scrollIntoViewIfNeeded(); await f2.focus();
  const fd = await desc(page); L('  focused: "'+fd.text+'" outline="'+fd.outline+'" rect='+JSON.stringify(fd.rect));
  const beforeCards = await page.evaluate(()=>document.querySelectorAll('main article, main a[href^="/portfolio"], main h2').length);
  await page.keyboard.press('Enter'); await page.waitForTimeout(700);
  L('  after Enter aria-pressed='+await f2.getAttribute('aria-pressed'));
  await page.keyboard.press('Space'); await page.waitForTimeout(700);
  L('  after Space aria-pressed='+await f2.getAttribute('aria-pressed'));
  const liveRegions = await page.evaluate(()=>[...document.querySelectorAll('[aria-live],[role=status],[role=alert]')].map(e=>e.tagName+'['+(e.getAttribute('aria-live')||e.getAttribute('role'))+']'));
  L('  live regions on /portfolio: '+JSON.stringify(liveRegions));
  await ctx.close();
}
await browser.close();
fs.writeFileSync(SP+'/res2.txt', log.join('\n'));
