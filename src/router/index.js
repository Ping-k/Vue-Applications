import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld')
const ECharts = () => import('@/views/ECharts')
const BaiduUEditor = () => import('@/views/Editor/BaiduUEditor')
const BaiduUEditorWeChatEmoji = () => import('@/views/Editor/BaiduUEditorWeChatEmoji')
const QuillEditor = () => import('@/views/Editor/QuillEditor')
const WangEditor = () => import('@/views/Editor/WangEditor')
const Sortablejs = () => import('@/views/Sortablejs')
const VueComponentPass = () => import('@/views/VueComponentPass')
const VueLazyload = () => import('@/views/VueLazyload')
const TreePageLoad = () => import('@/views/TreePageLoad')
const GridSystem = () => import('@/views/GridSystem')
const FloatSelfBtn = () => import('@/views/FloatSelfBtn')
const BaiduMap = () => import('@/views/BaiduMap/BaiduMap')
const BaiduMapMobile = () => import('@/views/BaiduMap/BaiduMapMobile')
const CustomIcon = () => import('@/views/CustomIcon')
const ControlsCSS = () => import('@/views/ControlsCSS')

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    }, {
      path: '/QuillEditor',
      name: 'QuillEditor',
      component: QuillEditor
    }, {
      path: '/WangEditor',
      name: 'WangEditor',
      component: WangEditor
    }, {
      path: '/Sortablejs',
      name: 'Sortablejs',
      component: Sortablejs
    }, {
      path: '/VueComponentPass',
      name: 'VueComponentPass',
      component: VueComponentPass
    }, {
      path: '/VueLazyload',
      name: 'VueLazyload',
      component: VueLazyload
    }, {
      path: '/TreePageLoad',
      name: 'TreePageLoad',
      component: TreePageLoad
    }, {
      path: '/GridSystem',
      name: 'GridSystem',
      component: GridSystem
    }, {
      path: '/FloatSelfBtn',
      name: 'FloatSelfBtn',
      component: FloatSelfBtn
    }, {
      path: '/BaiduMap',
      name: 'BaiduMap',
      component: BaiduMap
    }, {
      path: '/BaiduMapMobile',
      name: 'BaiduMapMobile',
      component: BaiduMapMobile
    }, {
      path: '/CustomIcon',
      name: 'CustomIcon',
      component: CustomIcon
    }, {
      path: '/ControlsCSS',
      name: 'ControlsCSS',
      component: ControlsCSS
    }, {
      path: '/IP',
      name: 'IP',
      component: () => import('@/views/IP')
    }, {
      path: '/Print',
      name: 'Print',
      component: () => import('@/views/Print')
    }
  ]
})
