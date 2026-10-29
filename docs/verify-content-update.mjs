import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
// Run against `npm run preview` on 127.0.0.1:4321. Adds one temporary featured system to src/content/work.ts, checks the home selector and the Work page, then restores the file and rebuilds.
const file='src/content/work.ts';const original=await readFile(file,'utf8');
const engineFiles=['src/scripts/room.ts','src/scripts/room-state.ts','src/scripts/home.ts'];
const hash=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
const before=await Promise.all(engineFiles.map(hash));
function build(){const r=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{encoding:'utf8'});assert.equal(r.status,0,r.stdout+r.stderr)}
let browser;
try{
 const featured=(original.match(/featured: true/g)||[]).length;
 // featuredSystems is filtered when the module loads, so the record goes inside the systems array, not after it.
 const lf=original.replace(/\r\n/g,'\n');const end=lf.indexOf('\n];',lf.indexOf('export const systems'));assert.ok(end>0);
 const temp='\n  {slug:"temporary-content-test",audience:"individuals",title:"A temporary system with a deliberately long title for content resilience",sector:"Test",summary:"Temporary record.",points:["One point"],image:"/images/about.webp",imageAlt:"Temporary portrait used only by the content update check",featured:true},';
 await writeFile(file,lf.slice(0,end)+temp+lf.slice(end));
 build();browser=await chromium.launch();const page=await browser.newPage({viewport:{width:360,height:800},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:4321/?project=temporary-content-test',{waitUntil:'networkidle'});
 const selectors=await page.locator('[data-select-project]').count();assert.equal(selectors,featured+1);
 assert.equal(await page.locator('[data-select-project="temporary-content-test"]').count(),1);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.locator('[data-select-project="temporary-content-test"]').scrollIntoViewIfNeeded();await page.screenshot({path:'artifacts/verification/temporary-record-mobile.png'});
 await page.goto('http://127.0.0.1:4321/work/',{waitUntil:'networkidle'});const card=page.locator('#individuals #temporary-content-test');
 assert.equal(await card.isVisible(),true);assert.match(await card.locator('h3').innerText(),/deliberately long/);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.deepEqual(await Promise.all(engineFiles.map(hash)),before);process.stdout.write(`PASS: featured record in the home selector (${selectors}), long title card on the Work page at 360 wide. Animation files unchanged.\n`);
}finally{await browser?.close();await writeFile(file,original);build();assert.equal(await readFile(file,'utf8'),original);process.stdout.write('RESTORED: exact original content and production build.\n')}
