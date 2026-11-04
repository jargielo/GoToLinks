// Reproduce the supplied chain artwork at launcher sizes without redrawing it.
const sharp=require('sharp');
const path=require('node:path');
const root=path.join(__dirname,'..');
(async()=>{for(const [name,size,coverage] of [['icon-chain-192.png',192,.92],['icon-chain-512.png',512,.92],['icon-chain-maskable-512.png',512,.70]]){const mark=await sharp(path.join(root,'icon-source.jpg')).extract({left:197,top:62,width:1141,height:1099}).resize(Math.round(size*coverage),Math.round(size*coverage),{fit:'inside'}).png().toBuffer();await sharp({create:{width:size,height:size,channels:3,background:'#f2f2f2'}}).composite([{input:mark,gravity:'centre'}]).png().toFile(path.join(root,name));console.log(name)}})().catch(e=>{console.error(e);process.exitCode=1});
