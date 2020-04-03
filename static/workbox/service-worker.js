//service-worker.js
console.log('Hello from service-worker.js');

'use strict';

//使用阿里的CDN
importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');
workbox.setConfig({
  modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.3.0/'
});
if (workbox) {
  console.log(`Yay! Workbox is loaded`);

  workbox.core.setCacheNameDetails({
    prefix: 'pingk',
    suffix: 'v1',
    precache: 'workbox-precache',
    runtime: 'workbox-runtime'
  });


// 缓存名称
  let cacheName = 'workbox-pingk-2';

  workbox.routing.registerRoute(
    // 缓存css文件
    /.*\.css/,
    // 使用缓存，但尽快在后台更新
    workbox.strategies.staleWhileRevalidate({
      // 使用自定义缓存名称
      // cacheName: cacheName + 'css',
    })
  );
  workbox.routing.registerRoute(
    // 缓存js文件
    /.*\.js/,
    // 使用缓存，但尽快在后台更新
    workbox.strategies.staleWhileRevalidate({
      // 使用自定义缓存名称
      // cacheName: cacheName + 'js',
    })
  );
  workbox.routing.registerRoute(
    // 缓存js文件
    /.*\.(jpg|png|jpeg)/,
    // 使用缓存，但尽快在后台更新
    workbox.strategies.staleWhileRevalidate({
      // 使用自定义缓存名称
      // cacheName: cacheName + 'img',
    })
  );
  workbox.routing.registerRoute(
    // 缓存gravatar文件
    new RegExp('https://cdn\.v2ex\.com/'),
    // 如果缓存可用，请使用它
    workbox.strategies.cacheFirst({
      // 使用自定义缓存名称
      cacheName: 'gravatar-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // 缓存最多30天
          maxAgeSeconds: 30 * 24 * 60 * 60,
        })
      ],
    })
  );


} else {
  console.log(`Boo! Workbox didn't load`);
}
