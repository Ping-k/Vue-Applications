<template>
  <div>

    <a href="https://github.com/hilongjw/vue-lazyload" target="_blank">GitHub</a>
    <a href="https://www.npmjs.com/package/vue-lazyload" target="_blank">npmjs</a>
    <a href="https://github.com/hilongjw/vue-lazyload#demo" target="_blank">官方Demo</a>

    <ul>
      <!--
        v-lazy 存在资源重复请求的问题，使用:key='item.src'即可解决，只可静态资源，vue动态资源没效果
      -->
      <li v-for="(item,index) in imgList" :key="index">
        <!-- 局部使用对象 -->
        <!--<img v-if="index%2===0" v-lazy="item" :key='item.src'>-->
        <!-- 全局配置，使用src -->
        <img v-lazy="item.src" :key='item.src'>
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
          {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/ff1f589c9e92467992c678dee1a08888.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/4061f32f37d4444691a7a29084126543.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/a16502a4c7bc4c5e9e3371fb0acb0735.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/32093e0ee8974758b7388e7be5da8d95.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/b3e45d5fa1cf4f6ea52036e9020e69a0.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/dfa3d9eb482a499f82cedddfc999d33b.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/959e0b39bc284d0699652c7679f73a4e.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/c7cc51d713f944b98eaf665164ed3e1b.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/da5033d7a20f4666b917da32c097d0f7.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/94bb6183c6314d19b5aaceefc34cc474.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/01992265d0974e26b3c7b4162a187a82.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/a75d31ac12b5487a8fa94aa8dbfd6143.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/c15f9342da67487992405890eb223c3f.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/77719c0a4c09468e99c8f35b971b2469.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/c99cb065bb784506803602799865d573.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/f9f3c1e5b72a46bbb29d49899c3465da.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/2f36daf4e341493b9abe5d0b1ccc8d40.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/7e91fb9684b345bea2603803642905d2.jpeg",
            error: error,
            loading: loading
          }, {
            src: "http://5b0988e595225.cdn.sohucs.com/images/20190429/5a6fe887599245698ec8729adee2c609.jpeg",
            error: error,
            loading: loading
          }
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
      height: 300px;
      padding: 10px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
</style>
