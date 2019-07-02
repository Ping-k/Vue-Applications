<template>
  <div style="margin: 50px auto;width: 800px;">
    <h3>wangEditor 富文本编辑器</h3>
    <p>
      <a href="http://www.wangeditor.com/index.html" target="_blank">官网</a>
      <a href="https://github.com/wangfupeng1988/wangEditor" target="_blank">GitHub</a>
      <a href="https://github.com/wangfupeng1988/wangEditor/tree/master/example/demo/in-vue"
         target="_blank">Vue-Demo</a>
    </p>

    <div ref="editor" style="text-align:left"></div>

    <br>

    <button v-on:click="getHtml">获取html</button>

    <button v-on:click="getText">获取text</button>

    <div v-html="editorContent"></div>

  </div>
</template>

<!--
1、安装插件：cnpm install wangeditor --save
-->

<script>
  import E from 'wangeditor'

  export default {
    name: 'WangEditor',
    data() {
      return {
        wEditor: {},
        editorContent: ''
      }
    },
    methods: {
      getHtml: function () {
        console.log(this.wEditor.txt.html())
      },
      getText: function () {
        console.log(this.wEditor.txt.text())
      }
    },
    mounted() {
      let editor = new E(this.$refs.editor)

      // 自定义菜单配置
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        // 'quote',  // 引用
        // 'emoticon',  // 表情
        'image',  // 插入图片
        // 'table',  // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]

      // 自定义配置颜色（字体颜色、背景色）
      editor.customConfig.colors = [
        '#000000',
        '#ffffff',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        'red',
      ];

      // 隐藏“网络图片”tab
      editor.customConfig.showLinkImg = true;

      // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
      // editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      editor.customConfig.uploadImgServer = 'http://192.168.1.243:8085/api/activity/file/imgUpload'  // 上传图片到服务器
      // 将图片大小限制为 3M
      editor.customConfig.uploadImgMaxSize = 100 * 1024;
      // 限制一次最多上传 5 张图片
      editor.customConfig.uploadImgMaxLength = 2;
      // 自定义 header
      editor.customConfig.uploadImgHeaders = {
        'Authorization': 'bearer 4c105a29-571e-4cd3-927f-4e62edb603fb'
      }
      // 自定义提示方法
      editor.customConfig.customAlert = function (info) {
        // info 是需要提示的内容
        alert('自定义提示：' + info)
      }

      // 自定义上传图片事件
      editor.customConfig.customUploadImg = function (files, insert) {
        // files 是 input 中选中的文件列表
        // insert 是获取图片 url 后，插入到编辑器的方法

        let imgUrl = 'http://bpic.588ku.com//back_water_img/19/02/14/130da39db9c9b5d552e133fc3115479623.jpg'
        // 上传代码返回结果之后，将图片插入到编辑器中
        insert(imgUrl)
      }

      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create();
      this.wEditor = editor;
    }
  }
</script>

<style scoped>
</style>
