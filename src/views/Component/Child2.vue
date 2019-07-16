<template>
  <div>
    <p>我来自：{{propC}}</p>
  </div>
</template>

<script>
  import eventBus from '@/eventBus'

  export default {
    name: "Child2",
    props: {
      propC: {
        type: String,
        default: '默认'
      }
    },
    data() {
      return {}
    },
    computed: {},
    mounted() {
      // eventBus文件方式
      eventBus.$on('pass', (msg) => {
        this.propC += msg;
        console.log(msg)
      })
      // window.eventBus全局方式
      window.EventBus.$on('pass', (msg) => {
        this.propC += msg;
        console.log(msg)
      })
    },
    methods: {}
  }
</script>


<style lang="scss" scoped>
  .input {
    width: 200px;
  }
</style>
