import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:3100';
const PAGES = ['/', '/about', '/portfolio', '/insights', '/contact', '/thank-you', '/privacy',
  '/services/structural-detail-engineering', '/insights/na-permission-dnh'];

const out = {};
const browser = await chromium.launch();

for (const p of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE + p, { waitUntil: 'load' });
  await page.waitForTimeout(800);

  // --- axe
  let axe = null;
  try {
    const r = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
    axe = r.violations.map(v => ({
      id: v.id, impact: v.impact, help: v.help, tags: v.tags.filter(t=>t.startsWith('wcag')),
      nodes: v.nodes.slice(0, 6).map(n => ({ target: n.target.join(' '), summary: (n.failureSummary||'').split('\n').filter(Boolean).slice(1).join(' | ').slice(0,300), html: n.html.slice(0,220) }))
    }));
  } catch (e) { axe = 'ERR: ' + e.message; }

  // --- semantics
  const sem = await page.evaluate(() => {
    const vis = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return cs.visibility !== 'hidden' && cs.display !== 'none' && !(r.width<=1 && r.height<=1);
    };
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role=heading]')].map(h => ({
      tag: h.tagName.toLowerCase(),
      level: h.getAttribute('role')==='heading' ? +(h.getAttribute('aria-level')||0) : +h.tagName[1],
      text: (h.getAttribute('aria-label') || h.textContent || '').trim().replace(/\s+/g,' ').slice(0, 70),
      visible: vis(h),
      ariaLabel: h.getAttribute('aria-label') || null,
      hidden: !!h.closest('[aria-hidden="true"]'),
    }));
    const landmarks = [...document.querySelectorAll('main,nav,header,footer,aside,form,section,[role]')]
      .filter(el => ['main','nav','header','footer','aside','banner','contentinfo','complementary','region','search','form'].includes(el.getAttribute('role') || el.tagName.toLowerCase()))
      .map(el => ({ el: el.tagName.toLowerCase(), role: el.getAttribute('role'), label: el.getAttribute('aria-label'), labelledby: el.getAttribute('aria-labelledby'), id: el.id || null }));
    const imgs = [...document.querySelectorAll('img')].map(i => ({
      src: (i.getAttribute('src')||'').slice(0,90), alt: i.getAttribute('alt'), hasAlt: i.hasAttribute('alt'),
      role: i.getAttribute('role'), ariaHidden: i.getAttribute('aria-hidden'),
      inHiddenParent: !!i.closest('[aria-hidden="true"]'),
      w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height),
    }));
    const svgs = [...document.querySelectorAll('svg')].map(s => ({
      ariaHidden: s.getAttribute('aria-hidden'), role: s.getAttribute('role'),
      label: s.getAttribute('aria-label'), title: s.querySelector('title')?.textContent || null,
      focusable: s.getAttribute('focusable'), cls: (s.getAttribute('class')||'').slice(0,40),
    })).filter(s => s.ariaHidden !== 'true');
    const controls = [...document.querySelectorAll('[aria-expanded],[aria-controls],[aria-pressed]')].map(el => {
      const ctl = el.getAttribute('aria-controls');
      return {
        tag: el.tagName.toLowerCase(), text: (el.textContent||'').trim().replace(/\s+/g,' ').slice(0,45),
        expanded: el.getAttribute('aria-expanded'), controls: ctl, pressed: el.getAttribute('aria-pressed'),
        controlsResolves: ctl ? ctl.split(/\s+/).every(i => !!document.getElementById(i)) : null,
        hasRoleButton: el.getAttribute('role'),
      };
    });
    const fields = [...document.querySelectorAll('input,select,textarea')].map(f => {
      let labelText = null, how = null;
      if (f.labels && f.labels.length) { labelText = [...f.labels].map(l=>l.textContent.trim().replace(/\s+/g,' ')).join('/').slice(0,60); how = f.labels[0].htmlFor === f.id && f.id ? 'for/id' : 'wrapping'; }
      if (f.getAttribute('aria-label')) { labelText = f.getAttribute('aria-label'); how = 'aria-label'; }
      if (f.getAttribute('aria-labelledby')) { how = 'aria-labelledby'; }
      return { type: f.type, name: f.name, id: f.id||null, required: f.required, labelText, how,
        placeholder: f.getAttribute('placeholder'), hiddenParent: !!f.closest('[aria-hidden="true"], .hidden') };
    });
    const skipLink = (()=>{ const a = document.querySelector('body a[href^="#"]'); return a ? { href: a.getAttribute('href'), text: a.textContent.trim().slice(0,40) } : null; })();
    const lang = document.documentElement.lang;
    const title = document.title;
    const dupIds = (()=>{ const seen={},d=[]; document.querySelectorAll('[id]').forEach(e=>{ if(seen[e.id]) d.push(e.id); seen[e.id]=1;}); return [...new Set(d)]; })();
    return { headings, landmarks, imgs, svgs, controls, fields, skipLink, lang, title, dupIds,
      mainCount: document.querySelectorAll('main, [role=main]').length,
      h1Count: document.querySelectorAll('h1').length };
  });

  out[p] = { axe, sem };
  console.log('done', p);
  await ctx.close();
}
await browser.close();
fs.writeFileSync('/private/tmp/claude-501/-Users-krutiikshah-Desktop-manovruti-website/61ff4b00-f8e3-4c5a-a895-de8be48f6cfd/scratchpad/res1.json', JSON.stringify(out, null, 1));
console.log('OK');
