<template>
  <div>

    <a href="https://github.com/hilongjw/vue-lazyload" target="_blank">GitHub</a>
    <a href="https://www.npmjs.com/package/vue-lazyload" target="_blank">npmjs</a>
    <a href="https://github.com/hilongjw/vue-lazyload#demo" target="_blank">官方Demo</a>

    <ul>
      <li v-for="(item,index) in imgList" :key="index">
        <!-- 局部使用对象 -->
        <img v-if="index%2===0" v-lazy="item">
        <!-- 全局配置，使用src -->
        <img v-else v-lazy="item.src">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "VueLazyload",
    data() {
      let error = require('@/assets/default.png')
      let loading = require('@/assets/loading3.gif')

      return {
        imgList: [
          {src: 'https://safe.51ylk.com/static2/img/feature_bg5.c32f9ff.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg6.024cefc.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg7.937aaa4.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg8.646ec20.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg6.462851b.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg5.d9cc0ed.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg7.937aaa4.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg8.646ec20.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg6.462851b.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg5.d9cc0ed.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg5.c32f9ff.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg6.024cefc.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg7.937aaa4.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg8.646ec20.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg6.462851b.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg5.d9cc0ed.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg5.d9cc0ed.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg5.c32f9ff.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg6.024cefc.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg7.937aaa4.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/feature_bg8.646ec20.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg6.462851b.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/err.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/err.err.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg5.d9cc0ed.png', error: error, loading: loading},
          {src: 'https://safe.51ylk.com/static2/img/index-news-bg6.462851b.png', error: error, loading: loading},
        ]
      }
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  ul {
    width: 1200px;
    margin: 50px auto;
    li {
      list-style: none;
      width: 45%;
      float: left;
      height: 260px;
      padding: 10px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
</style>
