import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
await mkdir('artifacts',{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror',e=>process.stdout.write(`ERROR ${e.message}\n`));
await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});
await page.locator('#room-canvas[data-ready=true]').waitFor({timeout:30000});
await page.screenshot({path:'artifacts/desktop-hero.png'});
for(const [name,y] of [['opening',950],['work',2200],['capabilities',3850],['training',4900],['recognition',5700],['contact',6600]]){
 await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(1100);await page.screenshot({path:`artifacts/desktop-${name}.png`});
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});await page.locator('#room-canvas[data-ready=true]').waitFor();await page.screenshot({path:'artifacts/mobile-hero.png'});
await page.evaluate(()=>window.scrollTo(0,1900));await page.waitForTimeout(1200);await page.screenshot({path:'artifacts/mobile-work.png'});
await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});await page.screenshot({path:'artifacts/mobile-reduced.png'});
await browser.close();

