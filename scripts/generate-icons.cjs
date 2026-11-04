// Code-native chain icon. Separate canvases avoid launcher padding around the standard icon.
const sharp=require('sharp');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
function source(scale){return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#17191e"/><g transform="translate(256 256) rotate(-42) scale(${scale}) translate(-256 -256)" fill="none" stroke="#f6f6f7" stroke-width="25"><rect x="122.5" y="222.5" width="175" height="67" rx="33.5"/><rect x="214.5" y="222.5" width="175" height="67" rx="33.5"/><path d="M218 256h76"/></g></svg>`}
(async()=>{fs.writeFileSync(path.join(root,'icon-source.svg'),source(2.0));for(const [name,size,scale] of [['icon-large-192.png',192,2.0],['icon-large-512.png',512,2.0],['icon-maskable-512.png',512,1.40]]){await sharp(Buffer.from(source(scale))).resize(size,size).png().toFile(path.join(root,name));console.log(name)}})().catch(e=>{console.error(e);process.exitCode=1});
