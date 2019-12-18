<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>

    <hr>

    <p>
      <el-button type="primary" @click="$router.push({name:'ECharts'})">ECharts</el-button>
      <el-button type="primary" @click="$router.push({name:'BaiduUEditor'})">BaiduUEditor</el-button>
      <el-button type="primary" @click="$router.push({name:'BaiduUEditorWeChatEmoji'})">
        BaiduUEditorWeChatEmoji
      </el-button>
      <el-button type="primary" @click="$router.push({name:'QuillEditor'})">QuillEditor</el-button>
      <el-button type="primary" @click="$router.push({name:'WangEditor'})">WangEditor</el-button>
      <el-button type="primary" @click="$router.push({name:'Sortablejs'})">Sortablejs</el-button>
    </p>

    <p>
      <el-button type="primary" @click="$router.push({name:'VueComponentPass'})">Vue组件传参</el-button>
      <el-button type="primary" @click="$router.push({name:'VueLazyload'})">Vue图片资源滚动懒加载</el-button>
      <el-button type="primary" @click="$router.push({name:'TreePageLoad'})">Tree分页加载</el-button>
      <el-button type="primary" @click="$router.push({name:'GridSystem'})">SCSS手写栅格系统</el-button>
    </p>

    <el-button type="primary" @click="getData">获取数据</el-button>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.isCalling">打电话</span>
          <el-button @click="scope.row.isCalling=true" type="text" size="small">通话</el-button>
          <el-button @click="scope.row.isCalling=false" type="text" size="small">挂断</el-button>
        </template>
      </el-table-column>
    </el-table>


    <p>
      <a href="/static/weChatVideoAutoplay.html">微信H5视频自动播放</a>
    </p>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          isCalling:false,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          isCalling:false,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          isCalling:false,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          isCalling:false,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          isCalling:false,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          isCalling:false,
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          isCalling:false,
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    methods:{
      getData(){
        console.log(this.multipleSelection, this.tableData)
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    mounted() {
      this.$message({
        message: 'hello，欢迎来到Vue-Applications',
        type: 'success'
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
