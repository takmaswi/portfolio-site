import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const file='src/content/projects.ts';const original=await readFile(file,'utf8');
const engineFiles=['src/scripts/room.ts','src/scripts/room-state.ts','src/scripts/home.ts'];
const hash=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
const before=await Promise.all(engineFiles.map(hash));
function build(){const r=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{encoding:'utf8'});assert.equal(r.status,0,r.stdout+r.stderr)}
let browser;
try{
 await writeFile(file,original+'\nprojects.push({...projects[0],slug:"temporary-content-test",title:"A temporary project with a deliberately long title for content resilience",image:"/images/about.webp"});\n');
 build();browser=await chromium.launch();const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:4321/?project=temporary-content-test',{waitUntil:'networkidle'});
 assert.equal(await page.locator('[data-select-project]').count(),5);assert.equal(await page.locator('[data-project="temporary-content-test"]').isVisible(),true);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.locator('[data-select-project="temporary-content-test"]').scrollIntoViewIfNeeded();await page.screenshot({path:'artifacts/verification/temporary-record-mobile.png'});
 await page.goto('http://127.0.0.1:4321/work/');assert.equal(await page.locator('.project-row').count(),5);
 const response=await page.goto('http://127.0.0.1:4321/work/temporary-content-test/');assert.equal(response.status(),200);assert.match(await page.locator('h1').innerText(),/deliberately long/);
 assert.deepEqual(await Promise.all(engineFiles.map(hash)),before);process.stdout.write('PASS: fifth record, long title, portrait image, selector, Work index and detail route. Animation files unchanged.\n');
}finally{await browser?.close();await writeFile(file,original);build();assert.equal(await readFile(file,'utf8'),original);process.stdout.write('RESTORED: exact original collection and production build.\n')}
