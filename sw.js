const CACHE='gotolinks-v2-20261104';
const CORE=['./','./index.html','./enhancements.js','./enhancements.css','./manifest.webmanifest','./firebase-config.js','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('gotolinks-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==location.origin)return;
 const root=new URL('./',self.location.href);
 const isCore=CORE.some(path=>new URL(path,root).pathname===url.pathname);
 if(request.mode!=='navigate'&&!isCore)return;
 event.respondWith(fetch(request).then(response=>{if(response.ok&&response.type==='basic'){const clone=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request.mode==='navigate'?new URL('index.html',root).href:request,clone)))}return response}).catch(async()=>{const cached=await caches.match(request.mode==='navigate'?new URL('index.html',root).href:request);return cached||Response.error()}));
});
