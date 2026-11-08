/* Cache semplice: prima la rete, se manca la rete usa l'ultima copia salvata. */
var CACHE='diario-bjj-v1';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(
    fetch(r).then(function(res){
      var copy=res.clone();
      caches.open(CACHE).then(function(c){c.put(r,copy)}).catch(function(){});
      return res;
    }).catch(function(){
      return caches.match(r).then(function(m){return m||caches.match('index.html')||caches.match('./')});
    })
  );
});
