/**
 * service worker简介
 * 部署只能在https协议上使用，本地开发可以使用localhost
 注意事项
 service worker 是一种JS工作线程，无法直接访问DOM, 该线程通过postMessage接口消息形式来与其控制的页面进行通信;
 service worker 广泛使用了Promise，这些在接下来代码示例中将会看到;
 目前并不是所有主流浏览器支持 service worker, 可以通过 navigator && navigator.serviceWorker 来进行特性探测;
 在开发过程中，可以通过 localhost 使用服务工作线程，如若上线部署，必须要通过https来访问注册服务工作线程的页面，
 但有种场景是我们的测试环境可能并不支持https， 这时就要通过更改host文件将localhost指向测试环境ip来巧妙绕过该问题（例如：192.168.22.144 localhost）;

 生命周期
 service worker的生命周期完全独立于网页，要为网站安装服务工作线程，我们需要在页面业务js代码中注册，浏览器从指定路径下载并解析服务
 工作线程脚本进而浏览器将会在后台启动安装步骤， 在安装过程中，我们通常会缓存静态资源，如果所有文件都成功缓存，那么服务工程线程就安装完毕，
 如果任何文件下载失败或缓存失败，那么安装步骤将会失败，当然也不会被激活。 安装后就进入激活步骤，这里是管理旧缓存的绝佳机会（后面代码示例中将会介绍原因），
 激活后service worker将开始对其作用域内的所有页面实施控制。 这里需要注意的是，首次注册 service worker 线程的页面需要再次加载才会受其控制。
 在成功安装完成并处于激活状态之前，服务工程线程不会收到fetch和push事件;
 *
 */

// 监测是否更新sw【swName】，实现自动刷新
let refreshing = false;
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) {
    return
  }
  refreshing = true;
  console.log('我有新版本了，自动更新中')
  // alert('我有新版本了，自动更新中');
  window.location.reload();
});

// 1、判断是否支持serviceWorker
if ("serviceWorker" in navigator) {
  /**
   * 2、注册serviceWorker
   * 这里需要注意的是register方法注册服务工作线程文件的位置，该path就是默认的 serviceworker 的作用域，例如注册path为/a/b/service-worker.js,
   * 则默认scope为/a/b/,当然也可以通过传入{scope: '/a/b/c/'}来指定自己的scope，但这里要特别注意的是，传入的scope参数一定是在默认
   * 作用域范围内再自定义（例如/a/b/c/），反之自定义为/d/e/就不行；
   * 通俗来讲，上面提到的scope就是 service worker 能够控制和发挥作用的范围；
   * 注意注册是在自己的业务代码中进行，后面会有具体通过插件来实现注册的代码
   */
  navigator.serviceWorker.register('./sw.js')
    .then(function (registration) {
      console.log("1：Register success: ", registration.scope);
    })
    .catch(function (err) {
      console.log("2：Register failed: ", err);
    });

} else {
  console.log('-1：Service workers are not supported.');
}
