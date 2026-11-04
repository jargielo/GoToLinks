const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
(async()=>{
 const events={},entries=new Map();let deleted=[],claimed=false;
 const cache={addAll:async paths=>{for(const path of paths)entries.set(new URL(path,'https://jargielo.github.io/GoToLinks/').href,{cached:true})},put:async(key,response)=>entries.set(typeof key==='string'?key:key.url,response)};
 const scope={URL,Response,location:new URL('https://jargielo.github.io/GoToLinks/sw.js'),caches:{open:async()=>cache,keys:async()=>['gotolinks-old','gotolinks-v2-20261104-icons','unrelated-cache'],delete:async key=>deleted.push(key),match:async key=>entries.get(typeof key==='string'?key:key.url)},fetch:async()=>{throw Error('offline')},self:{location:new URL('https://jargielo.github.io/GoToLinks/sw.js'),addEventListener:(type,callback)=>events[type]=callback,skipWaiting:async()=>{},clients:{claim:async()=>{claimed=true}}}};
 vm.runInNewContext(readFileSync(require('node:path').join(__dirname,'../sw.js'),'utf8'),scope);
 let pending;events.install({waitUntil:p=>pending=p});await pending;
 assert(entries.has('https://jargielo.github.io/GoToLinks/index.html'));assert(entries.has('https://jargielo.github.io/GoToLinks/enhancements.js'));
 events.activate({waitUntil:p=>pending=p});await pending;assert.deepEqual(deleted,['gotolinks-old']);assert(claimed);
 let response;events.fetch({request:{method:'GET',url:'https://jargielo.github.io/GoToLinks/?url=https%3A%2F%2Fexample.com',mode:'navigate'},respondWith:p=>response=p});assert.equal((await response).cached,true);
 response=null;events.fetch({request:{method:'POST',url:'https://jargielo.github.io/GoToLinks/',mode:'navigate'},respondWith:p=>response=p});assert.equal(response,null);
 events.fetch({request:{method:'GET',url:'https://www.gstatic.com/firebase.js',mode:'cors'},respondWith:p=>response=p});assert.equal(response,null);
 const manifest=JSON.parse(readFileSync(require('node:path').join(__dirname,'../manifest.webmanifest'),'utf8'));assert.equal(manifest.scope,'./');assert.equal(manifest.share_target.method,'GET');assert.equal(manifest.share_target.action,'./');assert.equal(manifest.icons.length,3);
 console.log('PASS: app-shell caching, offline navigation with shared URL, cache upgrade, POST bypass, external-request bypass, PWA scope and manifest.');
})().catch(error=>{console.error(error);process.exitCode=1});
