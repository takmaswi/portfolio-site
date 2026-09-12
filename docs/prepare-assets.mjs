import sharp from 'sharp';
import {copyFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const assets = [
 ['assets/generated/hero-desktop.png','hero-desktop',1920],
 ['assets/generated/hero-mobile.png','hero-mobile',850],
 ['assets/generated/about.png','about',1000],
 ['assets/generated/room-plate.png','room-plate',1600],
 ['assets/generated/seated-cutout.png','seated-cutout',1000],
 ['C:/Users/Dell/OneDrive/Documents/Idea Hub/Claude/Svika AI grand challenge/docs/design-evidence/landing/light-en.png','project-svika',1440],
 ['C:/dev/muripi/docs/screenshots/02-building.png','project-muripi',1440],
 ['C:/Users/Dell/OneDrive/Documents/Idea Hub/Claude/Cake Fairy/artifacts/screenshots/home-1440.png','project-cake',1600],
 ['C:/Users/Dell/Dev/bushkin-web/artifacts/hero-desktop.png','project-bushkin',1600],
];
await mkdir('assets/project-captures',{recursive:true});
for (const [source,name,width] of assets) {
 if(name.startsWith('project-')) await copyFile(source,path.join(root,'assets/project-captures',`${name}.png`));
 await sharp(source).resize({width,withoutEnlargement:true}).webp({quality:87,alphaQuality:100}).toFile(`public/images/${name}.webp`);
 const meta=await sharp(source).metadata();
 process.stdout.write(`${name}: ${meta.width}x${meta.height} alpha=${meta.hasAlpha}\n`);
}
