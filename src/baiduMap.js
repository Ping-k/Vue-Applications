export default {
  /**
   * JSONP方式
   * 官方示例：http://lbsyun.baidu.com/jsdemo.htm#a1_5
   */
  loadMap: function (options) {
    if (!options.callBack) {
      console.error('未配置回调函数')
      return;
    }
    if (!options.error) {
      options.error = () => {
        console.error('加载失败')
      }
    }
    var head = document.getElementsByTagName('head')[0]; //兼容IE
    var script = document.createElement('script');
    window._mapInit = () => {
      options.callBack(BMap)
    }
    script.type = 'text/javascript';
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + options.ak + "&callback=_mapInit&t=" + new Date().getTime();
    script.onerror = options.error;
    head.appendChild(script);
  }
}
