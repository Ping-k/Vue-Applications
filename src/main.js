// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
  components: { App },
  template: '<App/>'
})
