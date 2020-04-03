<template>
  <div>
    <button @click="jsPrint">原生打印</button>
    <button v-print="printObj">vPrint</button>

    <div id="printMe" class="printOrder-data">
      <div class="prints">
        <p>葫芦娃，葫芦娃</p>
        <p>一根藤上七朵花 </p>
        <p>小小树藤是我家 啦啦啦啦 </p>
        <p>叮当当咚咚当当　浇不大</p>
        <p> 叮当当咚咚当当 是我家</p>
        <p> 啦啦啦啦</p>
        <p>...</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "print",
    data() {
      return {
        printObj: {
          // *必填需部分打印输入的ID
          id: "#printMe",
          // 文档类型，默认是HTML5，可选html5，loose，strict
          standard: 'html5',
          // 附加到head标签的附加标签，以逗号分隔
          extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
          // 附加链接连接，以逗号分隔
          extraCss: 'https://manager.51ylk.com/ordinaryEnterprise/test.css',
          // 标题显示标题
          popTitle: 'Pingk测试打印',
          // 打印后的回调事件
          endCallback() {
            console.log('打印完成')
          }
        }
      }
    },
    methods: {
      // 原生打印
      jsPrint() {
        let printHtml = document.getElementsByClassName('printOrder-data')[0].innerHTML;
        document.body.innerHTML = printHtml;
        window.print();
        // 重新加载页面，以刷新数据
        window.location.reload();
      }
    }
  }
</script>

<style lang="scss" scoped>
.prints{
  background: red;
}
</style>
