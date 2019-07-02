<template>
  <div>
    <h3>vue-ueditor-wrap：基于百度UEditor</h3>
    <p class="link-btns">
      <a href="https://ueditor.baidu.com/website/onlinedemo.html" target="_blank">官网实例</a>
      <a href="https://ueditor.baidu.com/doc/" target="_blank">官网API文档</a>
      <a href="/static/UEditor/index.html">官网实例</a>

      <a href="https://github.com/HaoChuan9421/vue-ueditor-wrap" target="_blank">GitHub</a>
      <a href="https://github.com/HaoChuan9421/vue-ueditor-wrap-demo" target="_blank">Vue-Demo</a>
    </p>
    <button @click="getContent">获取内容</button>
    <div style="width: 60%;margin: 20px auto;">
      <vue-ueditor-wrap name="ueditor" ref="ueditors" v-model="msg" :config="myConfig" @ready="ready"
                        @beforeInit="addCustomButtom"></vue-ueditor-wrap>
    </div>

    <h3>微信表情</h3>
    <div style="width: 500px;margin: 20px auto;">
      <vue-ueditor-wrap name="ueditor2" ref="ueditors2" v-model="msg2" :config="myConfig2"
                        @ready="ready2"></vue-ueditor-wrap>
    </div>
  </div>
</template>

<!--
1、安装插件：cnpm install vue-ueditor-wrap -S
2、下载UEditor至static：https://github.com/HaoChuan9421/vue-ueditor-wrap/tree/master/public/UEditor
  或直接查看vue项目demo：https://github.com/HaoChuan9421/vue-ueditor-wrap-demo
-->

<script>
  import VueUeditorWrap from 'vue-ueditor-wrap'

  export default {
    name: "BaiduUEditor",
    components: {
      VueUeditorWrap
    },
    data() {
      return {
        arr: ['[微笑]', '[撇嘴]', '[色]', '[发呆]', '[得意]', '[流泪]', '[害羞]', '[闭嘴]', '[睡]', '[大哭]', '[尴尬]', '[发怒]', '[调皮]', '[呲牙]', '[惊讶]', '[难过]', '[囧]', '[抓狂]', '[吐]', '[偷笑]', '[愉快]', '[白眼]', '[傲慢]', '[困]', '[惊恐]', '[流汗]', '[憨笑]', '[悠闲]', '[奋斗]', '[咒骂]', '[疑问]', '[嘘]', '[晕]', '[衰]', '[骷髅]', '[敲打]', '[再见]', '[擦汗]', '[抠鼻]', '[鼓掌]', '[坏笑]', '[左哼哼]', '[右哼哼]', '[哈欠]', '[鄙视]', '[委屈]', '[快哭了]', '[阴险]', '[亲亲]', '[可怜]', '[菜刀]', '[西瓜]', '[啤酒]', '[咖啡]', '[猪头]', '[玫瑰]', '[凋谢]', '[嘴唇]', '[爱心]', '[心碎]', '[蛋糕]', '[炸弹]', '[便便]', '[月亮]', '[太阳]', '[拥抱]', '[强]', '[弱]', '[握手]', '[胜利]', '[抱拳]', '[勾引]', '[拳头]', '[OK]', '[跳跳]', '[发抖]', '[怄火]', '[转圈]', '😄', '😷', '😂', '😝', '😳', '😱', '😔', '😒', '[嘿哈]', '[捂脸]', '[奸笑]', '[机智]', '[皱眉]', '[耶]', '👻', '🙏', '💪', '🎉', '[礼物]', '[红包]', '[鸡]'],
        msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
        myConfig: {
          //打开右键菜单功能
          enableContextMenu: false,

          // 编辑器不自动被内容撑高
          // autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 300,
          // // 初始容器宽度
          // initialFrameWidth: '100%',
          // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
          serverUrl: '',//http://35.201.165.105:8000/controller.php
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
          // UEDITOR_HOME_URL: '/vue-editor/static/UEditor/'
        },
        baiduEdit: {},

        msg2: '啦啦啦啦，我的公众号[微笑][撇嘴][色][发呆][得意][流泪][害羞][闭嘴][睡][大哭][尴尬][发怒][调皮][呲牙][惊讶][难过][囧][抓狂][吐][偷笑][愉快][白眼][傲慢][困][惊恐][流汗][憨笑][悠闲][奋斗][咒骂][疑问][嘘][晕][衰][骷髅][敲打][再见][擦汗][抠鼻][鼓掌][坏笑][左哼哼][右哼哼][哈欠][鄙视][委屈][快哭了][阴险][亲亲][可怜][菜刀][西瓜][啤酒][咖啡][猪头][玫瑰][凋谢][嘴唇][爱心][心碎][蛋糕][炸弹][便便][月亮][太阳][拥抱][强][弱][握手][胜利][抱拳][勾引][拳头][OK][跳跳][发抖][怄火][转圈]😄😷😂😝😳😱😔😒[嘿哈][捂脸][奸笑][机智][皱眉][耶]👻🙏💪🎉[礼物][红包][鸡]',
        // msg2: '啦啦啦啦，我的公众号[微笑]',
        myConfig2: {
          toolbars: [
            ['emotion']
          ],
          //打开右键菜单功能
          enableContextMenu: false,
          //是否自动长高,默认true
          autoHeightEnabled: false,

          // 编辑器不自动被内容撑高
          // autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 300,
          // // 初始容器宽度
          // initialFrameWidth: '100%',
          // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
          serverUrl: '',//http://35.201.165.105:8000/controller.php
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
          // UEDITOR_HOME_URL: '/vue-editor/static/UEditor/'
        },
        baiduEdit2: {}
      }
    },
    methods: {
      // 获取实例
      ready(editorInstance) {
        this.baiduEdit = editorInstance;
        // 屏蔽Ctrl+Enter自动提交功能，在form表单标签下默认会自动提交
        this.baiduEdit.commands.autosubmit.execCommand = function () {
        };

        console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
      },
      // 获取实例
      ready2(editorInstance) {
        // 设置微信表情
        editorInstance.pageType = 'weChatPublic';
        this.baiduEdit2 = editorInstance;
        console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
      },
      // 获取内容
      getContent() {
        console.log(this.msg)
        console.log(this.baiduEdit.getPlainTxt())

        console.log(`====================================================`)
        console.log(this.msg2)
        console.log(this.baiduEdit2.getPlainTxt())
        let nodeDom = this.baiduEdit2.body.childNodes[0].childNodes;
        let str = '';
        let num = 0;
        for (var i = 0; i < nodeDom.length; i++) {
          if (nodeDom[i].nodeType === 1 && (nodeDom[i].nodeName === 'SPAN' || nodeDom[i].nodeName === 'IMG')) {
            let imgs = nodeDom[i].attributes.src.value;
            // 微信解析
            if (imgs.indexOf('/wx/') >= 0) {
              let s = imgs.split('/');
              let ss = (s[s.length - 1].split('.')[0]).split('_')[1]
              let index = Number(ss);

              str += this.arr[index - 1];
              num += 2;  //一个表情占两个长度
            } else {
              // 非微信
              str += nodeDom[i].outerHTML
            }
          } else if (nodeDom[i].nodeType === 3) {    //文本节点
            str += nodeDom[i].nodeValue;
            num += nodeDom[i].nodeValue.length;
          } else if (nodeDom[i].nodeType === 1 && nodeDom[i].nodeName === 'DIV') {
            str += nodeDom[i].outerHTML;
          }
        }
        console.log(str)
      },
      // 自定义按钮
      addCustomButtom(editorId) {
        window.UE.registerUI('test-button', function (editor, uiName) {
          // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
          editor.registerCommand(uiName, {
            execCommand: function () {
              editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`)
            }
          })

          // 创建一个 button
          var btn = new window.UE.ui.Button({
            // 按钮的名字
            name: uiName,
            // 提示
            title: '鼠标悬停时的提示文字',
            // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
            // cssRules: "background-image: url('/static/UEditor/themes/default/images/upload-img.png') !important;background-size: cover;",

            cssRules: "background-position: -380px 0px;",

            // 点击时执行的命令
            onclick: function () {
              // 这里可以不用执行命令，做你自己的操作也可
              editor.execCommand(uiName)

              let btninput = document.createElement("input");
              btninput.name = "fileName";
              btninput.type = "file";
              btninput.multiple = "multiple";
              btninput.accept = ".png,.jpg";
              btninput.style = "display:none;";
              btninput.onchange = function (event) {
                let files = event.target.files;
                console.log(event, files)

                // 手动上传图片

                // 添加图片
                // editor.execCommand('inserthtml', `<img src="https://imgtest-1257418739.cos.ap-guangzhou.myqcloud.com/userFile/152/2019-05-14/3cf2139c-9148-440b-a284-d82a52717342.jpg" />`);

                document.body.removeChild(btninput)
              }
              document.body.appendChild(btninput);
              btninput.click();
            }
          })

          // 当点到编辑内容上时，按钮要做的状态反射
          editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState(uiName)
            if (state === -1) {
              btn.setDisabled(true)
              btn.setChecked(false)
            } else {
              btn.setDisabled(false)
              btn.setChecked(state)
            }
          })

          // 因为你是添加 button，所以需要返回这个 button
          return btn
        }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
      },
      // 自定义弹窗
      addCustomDialog(editorId) {
        window.UE.registerUI('test-dialog', function (editor, uiName) {
          // 创建 dialog
          var dialog = new window.UE.ui.Dialog({
            // 指定弹出层中页面的路径，这里只能支持页面，路径参考常见问题 2
            iframeUrl: '/wangEditor',
            // 需要指定当前的编辑器实例
            editor: editor,
            // 指定 dialog 的名字
            name: uiName,
            // dialog 的标题
            title: '这是一个自定义的 Dialog 浮层',
            // 指定 dialog 的外围样式
            cssRules: 'width:600px;height:300px;',
            // 如果给出了 buttons 就代表 dialog 有确定和取消
            buttons: [
              {
                className: 'edui-okbutton',
                label: '确定',
                onclick: function () {
                  dialog.close(true)
                }
              },
              {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: function () {
                  dialog.close(false)
                }
              }
            ]
          })

          // 参考上面的自定义按钮
          var btn = new window.UE.ui.Button({
            name: 'dialog-button',
            title: '自定义弹窗',
            cssRules: "background-image: url('/static/UEditor/themes/default/images/upload-img.png') !important;background-size: cover;",
            onclick: function () {
              // 渲染dialog
              dialog.render()
              dialog.open()
            }
          })

          return btn
        }, 0 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */, editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
      }

    },
    mounted() {
      console.log(VueUeditorWrap, this.$refs)

      // 微信表情
      this.arr.map((item, index) => {
        for (var i = 0; i < this.msg2.length; i++) {
          if (this.msg2.indexOf(item) != -1) {
            let idx = index > 8 ? index + 1 : '0' + (index + 1);
            let imgs = '/static/UEditor/dialogs/emotion/images/wx/wx_'
            let img = '<img src="' + imgs + idx + '.png" _src="' + imgs + idx + '.png" width="24" height="24" style="vertical-align: middle;">';
            this.msg2 = this.msg2.replace(item, img);
          }
        }
      });
    }
  }
</script>

<style>
  #edui1_imagescale {
    display: none !important;
  }

  /*去除点击图片后出现的拉伸边框*/
  .edui-default .edui-editor {
    -webkit-border-radius: 0px !important;
    -moz-border-radius: 0px !important;
    border-radius: 0px !important;
  }

  .edui-default .edui-editor-toolbarbox {
    box-shadow: none !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
  }

  .edui-default .edui-toolbar {
    padding: 5px !important;
    text-align: left;
  }

  /*表情弹窗*/
  .edui-default .edui-popup-content {
    -webkit-border-radius: 0px !important;
    -moz-border-radius: 0px !important;
    border-radius: 0px !important;
  }
</style>
<style scoped>
  .link-btns a {
    margin: 0px 5px;
  }
</style>
