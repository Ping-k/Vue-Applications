<template>
  <div>
    <h2>KeepAlive缓存页面，首页进来自动销毁</h2>
    <el-input v-model="input" style="width: 200px" placeholder="请输入内容"></el-input>
    <p>
      <el-button type="text" @click="toTest">Test</el-button>
    </p>
  </div>
</template>

<script>
  export default {
    name: "KeepAlive",
    data() {
      return {
        input: ''
      }
    },
    /**
     * keep-alive 组件激活时调用。
     */
    activated() {
      console.log('刷新。。。')
    },
    methods: {
      toTest() {
        // sessionStorage.setItem('KeepAlive', true)
        this.$router.push({name: 'Test'})
      }
    },
  }
</script>

<style scoped>

</style>
