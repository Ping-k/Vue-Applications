<template>
  <div>
    <p>我来自：{{propA}}</p>
    <p>我来自：{{propB}}</p>
    <el-button @click="upPropB">更新PropB</el-button>
  </div>
</template>

<script>
  import eventBus from '@/eventBus'

  export default {
    name: "Child1",
    props: {
      propA: {
        type: String,
        default: '默认'
      },
      propB: {
        type: String,
        default: '默认'
      }
    },
    data() {
      return {}
    },
    computed: {},
    mounted() {

    },
    methods: {
      // 更新propB
      upPropB() {
        // 事件监听方式
        this.$emit('upPropB', '子传父666')
        // eventBus文件方式
        eventBus.$emit('pass', 'eventBus文件方式')
        // window.eventBus全局方式
        window.EventBus.$emit('pass', 'window.eventBus全局方式')
      }
    }
  }
</script>


<style lang="scss" scoped>
  .input {
    width: 200px;
  }
</style>
