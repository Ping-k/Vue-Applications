<template>
  <div>

    【sortablejs】
    <p>
      <a href="https://www.npmjs.com/package/sortablejs" target="_blank">npm包</a>
      <a href="https://github.com/SortableJS/Sortable" target="_blank">GitHub</a>
    </p>

    <ul id="items">
      <li v-for="item in 10">item {{item}}</li>
    </ul>

    <div class="check-list">
      <el-checkbox-group ref="checkList" id="checkList" v-model="commodityDisplay">
        <el-checkbox v-for="mod in customModules" :label="mod.label" v-bind:key="mod.id"
                     class="commodity-item">{{mod.name}}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-button @click="getData">获取数据</el-button>
  </div>
</template>

<!--
1、安装插件：cnpm install sortablejs --save
-->

<script>
  import Sortable from 'sortablejs'

  export default {
    name: "Sortablejs",
    data() {
      return {
        commodityDisplay: [],
        customModules: [
          {id: '1', name: '扫码验证', label: 'scavengingTruth'},
          {id: '2', name: '营销活动', label: 'marketingActivities'},
          {id: '3', name: '积分商城', label: 'integralMall'},
          {id: '4', name: '资讯公告', label: 'aboutUs'},
          {id: '5', name: '会员中心', label: 'memberCenter'},
          {id: '6', name: '商品溯源', label: 'commodityTrace'},
          {id: '7', name: 'sdf', label: 'module7#'},
          {id: '8', name: '我的视频', label: 'module8#'},
          {id: '9', name: '我的资讯', label: 'module9#'}
        ],
      }
    },
    methods: {
      // 打印
      getData() {
        // 获取顺序
        let newValue = [];
        if (this.commodityDisplay.length > 0) {
          for (let i = 0; i < this.commodityDisplay.length; i++) {
            for (let j = 0; j < this.customModules.length; j++) {
              if (this.commodityDisplay[i] === this.customModules[j].label) {
                newValue.push({index: j, label: this.customModules[j].label})
              }
            }
          }

          // 排序
          newValue.sort(function (a, b) {
            return a.index - b.index;
          })
        }

        console.log(this.commodityDisplay, JSON.stringify(this.customModules))
        console.log('排序：', JSON.stringify(newValue))
      }
    },
    mounted() {
      let that = this;

      let el = document.getElementById('items');
      let sortable = Sortable.create(el, {
        group: 'shared',
        animation: 150
      });


      let el2 = document.getElementById('checkList');
      let sortable2 = Sortable.create(el2, {
        group: 'shared',
        animation: 150,
        onEnd: function (evt) {  //拖拽结束发生该事件
          console.log(evt)
          // 更新数据结构位置
          that.customModules.splice(evt.newIndex, 0, that.customModules.splice(evt.oldIndex, 1)[0]);

          // let newArray = that.customModules.slice(0);
          // that.customModules = [];
          // that.$nextTick(function () {
          //   that.customModules = newArray;
          // });
        },
      });

    }
  }
</script>

<style scoped>
  #items {
    width: 500px;
    margin: 50px auto;
    border: 1px solid #dcdcdc;
    overflow: auto;
  }

  #items li {
    list-style: none;
    float: left;
    margin: 5px;
    border: 1px solid #00a0e9;
    height: 50px;
    line-height: 50px;
    width: 60px;
    text-align: center;
  }

  .check-list {
    width: 500px;
    margin: 50px auto;
    border: 1px solid #dcdcdc;
    text-align: left;
  }

  .commodity-item {
    width: 100px;
    text-align: left;
    padding: 5px 0px 5px 20px;
  }

</style>
