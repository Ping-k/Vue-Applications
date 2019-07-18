// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Vue组件传参Bus
window.EventBus = new Vue();

import VueLazyload from 'vue-lazyload'

// 注入组件
// Vue.use(VueLazyload)

// 注入组件，并配置全局属性
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/default.png'),
  loading: require('@/assets/loading.gif'),
  attempt: 1
})

// cnpm install element-ui -S
import Element from 'element-ui'
// 切记！必须引用样式资源，否则无法正常显示
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element) // 全局使用ElementUI

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }
})
