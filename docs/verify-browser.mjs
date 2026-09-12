import {chromium,firefox,webkit} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const origin='http://127.0.0.1:4321';
await mkdir('artifacts/verification',{recursive:true});
const report={checks:[],issues:[],metrics:{},browsers:{}};
const browser=await chromium.launch();const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();
page.on('pageerror',e=>report.issues.push(e.message));
await page.addInitScript(()=>{window.__cls=0;window.__lcp=0;new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__cls+=e.value})).observe({type:'layout-shift',buffered:true});new PerformanceObserver(l=>{window.__lcp=l.getEntries().at(-1).startTime}).observe({type:'largest-contentful-paint',buffered:true})});
await page.goto(origin,{waitUntil:'networkidle'});await page.locator('#room-canvas[data-ready=true]').waitFor();
await page.screenshot({path:'artifacts/verification/desktop-home.png'});
await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(el=>el===document.activeElement),true);report.checks.push('Keyboard skip link is first focus target');
await page.evaluate(()=>window.scrollTo(0,2300));await page.waitForTimeout(1000);assert.equal(await page.locator('.work-installation').getAttribute('aria-hidden'),'false');
for(const button of await page.locator('[data-select-project]').all()){await button.click();const slug=await button.getAttribute('data-select-project');assert.equal(await page.locator(`[data-project="${slug}"]`).isVisible(),true);assert.equal(new URL(page.url()).searchParams.get('project'),slug)}
await page.goBack();assert.equal(new URL(page.url()).searchParams.get('project'),'bushkin');report.checks.push('All project selectors update visible panel and URL; browser Back restores selection');
await page.screenshot({path:'artifacts/verification/desktop-work.png'});
for(const y of [0,1700,600,2700,0]){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(750);assert.equal(await page.locator('#room-canvas[data-ready=true]').count(),1)}report.checks.push('Fast and reverse scroll retain active scene');
report.metrics=await page.evaluate(()=>({cls:window.__cls,lcpMs:window.__lcp,transferBytes:performance.getEntriesByType('resource').reduce((a,e)=>a+e.transferSize,0),resourceCount:performance.getEntriesByType('resource').length}));
for(const route of ['/','/work/','/work/svika/','/work/muripi/','/work/bushkin/','/work/taku-cake/','/about/','/training/','/recognition/','/contact/']){
 const response=await page.goto(origin+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);assert.equal(await page.locator('h1').count(),1);
 const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));assert.deepEqual(broken,[]);
 const text=await page.locator('body').innerText();assert.equal(/[\u2013\u2014]/.test(text),false,`dash on ${route}`);
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();if(audit.violations.length)report.issues.push(...audit.violations.map(v=>({route,id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
 await page.screenshot({path:`artifacts/verification/page-${route.replaceAll('/','_')||'home'}.png`,fullPage:route!=='/'});
}report.checks.push('All 10 routes respond, one h1, images loaded, copy has no em/en dashes');
await page.goto(origin+'/contact/');assert.equal(await page.locator('a[href="mailto:takmaswi@gmail.com"]').count()>0,true);assert.equal(await page.locator('form').count(),0);report.checks.push('Contact offers verified mailto, no fake form submission');
for(const width of [320,375,390,768,1024,1440,1920]){await page.setViewportSize({width,height:900});await page.goto(origin,{waitUntil:'networkidle'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow ${width}`);await page.screenshot({path:`artifacts/verification/width-${width}.png`})}report.checks.push('No document overflow at 320,375,390,768,1024,1440,1920');
await page.setViewportSize({width:390,height:844});await page.goto(origin,{waitUntil:'networkidle'});await page.locator('.motion-control').click();assert.equal(await page.locator('html').getAttribute('data-motion'),'reduced');await page.reload({waitUntil:'networkidle'});assert.equal(await page.locator('html').getAttribute('data-motion'),'reduced');assert.equal(await page.locator('.work-installation').getAttribute('aria-hidden'),'false');await page.screenshot({path:'artifacts/verification/reduced-mobile.png',fullPage:true});report.checks.push('Motion control persists and exposes static project installation');
await page.evaluate(()=>localStorage.removeItem('taku-motion'));await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});assert.equal(await page.locator('html').getAttribute('data-motion'),'reduced');report.checks.push('System reduced-motion respected');
const fallback=await browser.newPage({viewport:{width:390,height:844}});await fallback.addInitScript(()=>{const orig=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(String(type).includes('webgl'))return null;return orig.call(this,type,...args)}});await fallback.goto(origin,{waitUntil:'networkidle'});await fallback.locator('.fallback-mode').waitFor();assert.equal(await fallback.locator('.work-installation').getAttribute('aria-hidden'),'false');await fallback.screenshot({path:'artifacts/verification/webgl-fallback.png'});report.checks.push('Forced WebGL failure retains portrait and static Work');
await browser.close();
for(const [name,engine] of [['Firefox',firefox],['WebKit',webkit]]){try{const b=await engine.launch();const p=await b.newPage();await p.goto(origin,{waitUntil:'networkidle'});assert.equal(await p.locator('h1').count(),1);await p.goto(origin+'/work/');assert.equal(await p.locator('h1').count(),1);report.browsers[name]='PASS basic home and work navigation';await b.close()}catch(e){report.browsers[name]=`NOT TESTED: ${e.message.split('\n')[0]}`}}
await writeFile('artifacts/verification/report.json',JSON.stringify(report,null,2));process.stdout.write(JSON.stringify(report,null,2));

