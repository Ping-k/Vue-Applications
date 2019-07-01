import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ECharts from '@/views/ECharts'
import BaiduUEditor from '@/views/Editor/BaiduUEditor'
import BaiduUEditorWeChatEmoji from '@/views/Editor/BaiduUEditorWeChatEmoji'

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
    }, {
      path: '/BaiduUEditorWeChatEmoji',
      name: 'BaiduUEditorWeChatEmoji',
      component: BaiduUEditorWeChatEmoji
    }
  ]
})
