<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>

    <hr>

    <p>
      <el-button type="primary" @click="$router.push({name:'ECharts'})">ECharts</el-button>
      <el-button type="primary" @click="$router.push({name:'BaiduUEditor'})">BaiduUEditor</el-button>
      <el-button type="primary" @click="$router.push({name:'BaiduUEditorWeChatEmoji'})">
        BaiduUEditorWeChatEmoji
      </el-button>
      <el-button type="primary" @click="$router.push({name:'QuillEditor'})">QuillEditor</el-button>
      <el-button type="primary" @click="$router.push({name:'WangEditor'})">WangEditor</el-button>
      <el-button type="primary" @click="$router.push({name:'Sortablejs'})">Sortablejs</el-button>
    </p>

    <p>
      <el-button type="primary" @click="$router.push({name:'VueComponentPass'})">Vue组件传参</el-button>
      <el-button type="primary" @click="$router.push({name:'VueLazyload'})">Vue图片资源滚动懒加载</el-button>
      <el-button type="primary" @click="$router.push({name:'TreePageLoad'})">Tree分页加载</el-button>
      <el-button type="primary" @click="$router.push({name:'GridSystem'})">SCSS手写栅格系统</el-button>
      <el-button type="primary" @click="$router.push({name:'FloatSelfBtn'})">浮动拖拽自吸按钮</el-button>
    </p>

    <p>
      <el-button type="primary" @click="$router.push({name:'CustomIcon'})">自定义图标</el-button>
      <el-button type="primary" @click="$router.push({name:'BaiduMap'})">BaiduMap</el-button>
      <el-button type="primary" @click="$router.push({name:'BaiduMapMobile'})">BaiduMap-Mobile</el-button>
      <a href="/static/baiduMapTest/test4.html" target="_blank">百度线路导航</a>
      <a href="/static/baiduMapTest/test5.html" target="_blank">百度移动线路导航</a>
      <a href="/static/baiduMapTest/test6.html" target="_blank">百度移动线路规划</a>
      <a href="/static/baiduMapTest/test7.html" target="_blank">百度搜索定位弹窗</a>
    </p>

    <p>
      <el-button type="primary" @click="$router.push({name:'ControlsCSS'})">自定义Radio、Checked、Switch</el-button>
      <el-button type="primary" @click="$router.push({name:'IP'})">IP查询</el-button>
      <el-button type="primary" @click="$router.push({name:'Print'})">打印</el-button>
    </p>
    <p>
      <a href="/static/weChatVideoAutoplay.html">微信H5视频自动播放</a>
    </p>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    },
    methods: {},
    mounted() {
      this.$message({
        message: 'hello，欢迎来到Vue-Applications',
        type: 'success'
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
