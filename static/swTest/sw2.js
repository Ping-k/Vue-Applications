// 项目地址
let path = '/Vue-Applications/static/swTest/';

// 配置缓存资源
let cacheFiles = [
  path + 'index.html',
  path + 'index.js',
  path + 'index2.js',
  path + 'index.css',
  path + 'img/1.jpg',
  path + 'img/2.jpg',
  path + 'img/3.jpg',
  path + 'img/refresh.png',
];

// 缓存名称
let swName = 'pingk-sw-v0.0.1';

/**
 * 3、安装服务工作线程
 * 下面代码就是前面注册的service-worker.js文件内容；
 * 我们通过install事件来定义安装步骤，通过缓存名称调用caches.open(), 之后再调用cache.addAll()并传入具体缓存文件清单数组，
 * 这是一个Promise链式event.waitUntil()方法带有Promise参数并使用它来判断花费耗时以及安装是否成功；
 * 正如前面提到，安装过程中如果所有清单中文件成功缓存，则安装结束，否则安装过程视为失败，所以在实践中我们尽可能缓存核心资源以避免服务工作线程未能安装;
 */
self.addEventListener('install', event => {
  console.log('install：安装服务工作线程');

  event.waitUntil(caches.open(swName)
    .then(cache => cache.addAll(cacheFiles))
    .then(ok => console.log('add all ok：' + ok), e => console.log(e))
  );
});

// 监听消息，执行刷新
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    console.log('4：跳过等待，直接刷新 ' + new Date().getTime());
    // 强制等待中的service worker跳过等待成为激活的service worker。
    self.skipWaiting();
  }
})

/**
 * 4、激活serviceWorker
 * 在某个时间点服务工程线程需要更新（例如：service-worker.js文件发生更改并上线）,用户访问页面时浏览器会尝试在后台重新下载service-worker.js,
 * 如果服务工程线程文件与当前所用文件存在字节差异，则将其视为“新服务工作线程”;
 * 新服务工作线程将会启动，且将会触发 install 事件;
 * 此时旧的服务工作线程仍将控制着当前页面，因此新服务工作线程将会进入waiting状态;
 * 当网站当前页面关闭时，旧服务工作线程将会终止，新服务工作线程将会取得控权;
 * 新服务工作线程取得控制权后，将会触发 activate 事件;监听 activate 事件的回调函数中常见的任务是管理缓存，
 * 前面我也提到过这是管理旧缓存的绝佳时机，因为如果在安装步骤中清理了旧缓存，由于旧的服务工作线程仍旧控制着页面，将无法从缓存中提取文件，
 * 但是在 activate 时旧服务工作线程已经终止了页面控制权，所在在这里清理旧缓存再合适不过;
 */
self.addEventListener('activate', event => {
  console.log('activate：激活serviceWorker');
  event.waitUntil(
    Promise.all([
      // 清理旧版本
      caches.keys().then(function (cacheList) {
        return Promise.all(
          cacheList.map(function (cacheName) {
            if (cacheName !== swName) {
              console.log('service worker: clear cache' + cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

/**
 * 5、监听：拦截请求并响应
 * 这里通过监听fetch事件来代理响应，进而实现自定义前端资源缓存;
 * 在event.respondWith()中我们传入来自caches.match()的一个promise,此方法拦截请求并从服务工作线程所创建的任何缓存中查找缓存结果，
 * 如若发现匹配的响应则返回缓存的值，否则，将会调用fetch以代理发出网络请求，并将从网络中检索的数据作为结果返回;
 * 如果希望连续性缓存新的请求，则注意注释的代码部分，其通过cache.put来将请求的响应添加到缓存来实现;在fetch请求中添加对then()的回调，
 * 获得响应后执行检查，并clone响应，注意这样处理的原因是该响应是stream,主体只能使用一次，我们需要返回能被浏览器使用的响应，
 * 还要传递到缓存以供使用，因此需要克隆一份副本;
 */
self.addEventListener('fetch', event => {
  console.log('serviceWorker: run into fetch', event.request.url);

  // 匹配缓存
  event.respondWith(caches.match(event.request).then(function (response) {
    // 判断是否缓存
    if (response) {
      console.log('serviceWorker匹配并读取缓存：' + event.request.url);
      return response;
    }

    // 不存在缓存
    console.log('serviceWorker缓存不存在，网络请求：' + event.request.url);
    return fetch(event.request);

    /*var fetchRequest = event.request.clone();
    return fetch(fetchRequest).then(function(response){
        if(!response || response.status !== 200 || response.type !== 'basic'){
            return response;
        }
        var responseToCache = response.clone();
        caches.open(cacheVersion).then(function (cache) {
            console.log(cache);
            cache.put(fetchRequest, responseToCache);
        });
        return response;
    });*/
  }));
});
