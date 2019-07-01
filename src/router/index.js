import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ECharts from '@/views/ECharts'
import BaiduUEditor from '@/views/Editor/BaiduUEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/ECharts',
      name: 'ECharts',
      component: ECharts
    }, {
      path: '/BaiduUEditor',
      name: 'BaiduUEditor',
      component: BaiduUEditor
    }
  ]
})
