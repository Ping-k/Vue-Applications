/**
 * index.js
 * service-worker的语法简介
 在service-worker.js中，self/this 表示 ServiceWorkerGlobalScope， 即全局的serviceworker工作环境，相当于在主进程中的window。
 在此文件中，js的其他api无法使用，如DOM，BOM操作等，但是大部分的js api可用，同时ES6也可以使用。
 在service-worker中可以定义监听事件，然后在对应事件中进行逻辑处理。
 */
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").then(registration => {
      console.log("register succces...")
    }, err => {
      console.log("register error...", err)
    });
  });
}
