<template>
  <div>
    <h2>Vue组件传参</h2>
    <fieldset>
      <legend>父组件</legend>
      propA：
      <el-input v-model="child1.propA" class="input" placeholder="请输入内容"></el-input>
      <p>propB：{{child1.propB}}</p>
    </fieldset>

    <fieldset>
      <legend>子组件</legend>
      <child1 :prop-a="child1.propA" :prop-b="child1.propB" @upPropB="upPropB"></child1>
      <child1></child1>
    </fieldset>

    <fieldset>
      <legend>子组件</legend>
      <child1></child1>
      <child2></child2>
    </fieldset>
  </div>
</template>

<script>

  import eventBus from '@/eventBus'
  import Child1 from '@/views/Component/Child1'
  import Child2 from '@/views/Component/Child2'

  export default {
    name: "VueComponentPass",
    data() {
      return {
        child1: {
          propA: '父传子',
          propB: '父传子',
        }
      }
    },
    components: {
      Child1, Child2
    },
    mounted() {
      // eventBus文件方式
      eventBus.$on('pass', (msg) => {
        this.child1.propB += msg;
        console.log(msg)
      })
      // window.eventBus全局方式
      window.EventBus.$on('pass', (msg) => {
        this.child1.propB += msg;
        console.log(msg)
      })
    },
    methods: {
      // 更新propB 事件监听方式
      upPropB(data) {
        this.child1.propB = data;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input {
    width: 200px;
  }

  fieldset {
    width: 600px;
    margin: 20px auto;
    text-align: left;
    border: 1px solid #0cc5dc;
  }

</style>
