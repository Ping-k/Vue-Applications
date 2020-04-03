<template>
  <div style="overflow: auto">

    <h3>浮动按钮拖拽、自吸</h3>

    <transition name="fade" mode="out-in">
      <div class="floatSelfBtn" :class="btnClass" ref="floatSelfBtn" @click="btnClick"
           :style="btnStyle" @touchstart="btnTouchStart"
           @touchmove="btnTouchMove" @touchend="btnTouchEnd">
        按钮
      </div>
    </transition>

  </div>
</template>

<script>
  export default {
    name: "floatSelfBtn",
    data() {
      return {
        btnStyle: {},
        startX: 0,
        startY: 0,
        btnW: 50,
        endX: 300,
        endY: 500,
        btnClass: ''
      }
    },
    mounted() {
      this.btnStyle = {
        left: this.endX + 'px',
        top: this.endY + 'px'
      }

      // window.location.reload()

      // 监听返回
      window.addEventListener("pageshow", (event) => {
        console.log("页面是否从浏览器缓存中加载? " + event.persisted);
      });
    },
    methods: {
      btnClick() {
        console.log('ssssssssssssssssss')
      },
      /**
       * 开始拖拽
       * @param e
       */
      btnTouchStart(e) {
        this.startX = e.targetTouches[0].pageX;
        this.startY = e.targetTouches[0].pageY;
        console.log('Start1', this.startX, this.startY)
        console.log('Start2', this.endX, this.endY)
        // 重置
        this.btnClass = '';
      },
      /**
       * 拖拽移动
       * @param e
       */
      btnTouchMove(e) {
        console.log('Move1 拖拽位置', e.targetTouches[0].pageX, e.targetTouches[0].pageY)

        // 移动距离
        var leftX = this.startX - e.targetTouches[0].pageX;
        var topY = this.startY - e.targetTouches[0].pageY;
        console.log('Move2 移动距离', leftX, topY)

        // 计算位置
        let l, t;
        l = this.endX - Math.floor(leftX)
        t = this.endY - Math.floor(topY)
        console.log('Move3 目标位置', l, t)

        // 计算边界
        var w = window.outerWidth;
        var h = window.outerHeight;
        console.log('dom', w, h)
        // 右侧边界
        if (l + this.btnW > w) {
          l = w - this.btnW - 10;
        }
        // 左侧边界
        if (l < 0) {
          l = 10;
        }

        // 底部边界
        if (t + this.btnW > h) {
          t = h - this.btnW - 10;
        }
        // 顶部边界
        if (t < 0) {
          t = 10;
        }

        console.log('Move4 过滤位置', l, t)
        this.btnStyle = {
          left: l + 'px',
          top: t + 'px',
        }
      },
      /**
       * 拖拽结束
       * @param e
       */
      btnTouchEnd(e) {
        this.endX = e.target.offsetLeft;
        this.endY = e.target.offsetTop;
        console.log('End', this.endX, this.endY)

        // 移动结束后，自吸处理
        let that = this;
        this.$nextTick(() => {
          // 计算位置
          let l = that.endX;
          let t = that.endY;
          console.log('Move3 目标位置', l, t)

          // 计算边界
          var w = window.outerWidth;
          var h = window.outerHeight;
          console.log('dom', w, h)
          // 右侧自吸
          let autoL = (w - that.btnW) / 2;
          if (l > autoL) {
            l = w - that.btnW - 10;
          } else {
            l = 10;
          }
          that.btnStyle = {
            left: l + 'px',
            top: t + 'px',
          }
          // 设置动画
          that.btnClass = 'btnAn';

          // 更新位置
          that.endX = l;
          that.endY = t;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  html, body {
    width: 100%;
    height: 100%;
  }

  @keyframes myfirst {
    0% {
      /*left: 50%;*/
    }
    100% {
      /*left: calc(100% - 60px);*/
    }
  }

  /* Firefox */
  @-moz-keyframes myfirst {
    0% {
      /*left: 50%;*/
    }
    100% {
      /*left: calc(100% - 60px);*/
    }
  }

  /* Safari and Chrome */
  @-webkit-keyframes myfirst {
    0% {
      /*left: 50%;*/
    }
    100% {
      /*left: calc(100% - 60px);*/
    }
  }

  /* Opera */
  @-o-keyframes myfirst {
    0% {
      /*left: 50%;*/
    }
    100% {
      /*left: calc(100% - 60px);*/
    }
  }

  .floatSelfBtn {
    position: fixed;
    width: 50px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    display: inline-block;
    background: #00a0e9;
    border-radius: 25px;
  }

  .btnAn {
    animation: myfirst 1.5s;
    -moz-animation: myfirst 1.5s; /* Firefox */
    -webkit-animation: myfirst 1.5s; /* Safari and Chrome */
    -o-animation: myfirst 1.5s; /* Opera */
  }

</style>
