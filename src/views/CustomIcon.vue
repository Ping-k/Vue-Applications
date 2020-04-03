<template>
  <div class="CustomIcon">
    <!-- 手动加载css -->
    <link rel="stylesheet" type="text/css" href="https://at.alicdn.com/t/font_1582399_y8t5ar2ppig.css">

    <h3>自定义图标</h3>
    <p style="color: #666666">
      elm图标直接使用自带图标库，iconfont是直接使用阿里图标库，已配置项目，都可自行补充
    </p>
    <el-row>
      <el-col class="my-row">
        选择颜色：
        <el-color-picker
          class="my-color"
          v-model="color"
          show-alpha
          :predefine="predefineColors">
        </el-color-picker>
      </el-col>
      <el-col class="my-row">
        选择尺寸：
        <el-input-number v-model="iconSize" size="small" :min="16" :max="128" :step="1" step-strictly></el-input-number>
      </el-col>
      <el-col class="my-row">
        elm-选择图标：
        <i class="my-icon" :class="elmIcon" :style="{color:color,fontSize:iconSize+'px'}"></i>
        <el-button type="primary" @click="showIcon('elm')">选择图标</el-button>
      </el-col>
      <el-col class="my-row">
        iconfont-选择图标：
        <i class="iconfont my-icon" :class="iconfont" :style="{color:color,fontSize:iconSize+'px'}"></i>
        <el-button type="primary" @click="showIcon('icon')">选择图标</el-button>
      </el-col>
    </el-row>

    <el-dialog title="选择图标" :visible.sync="dialogVisible" width="500px">
      <div>
        <ul v-if="iconType==='elm'" class="select-icon">
          <li v-for="(item,index) in elmIcons" :key="index" @click="selectIcon(item)">
            <i class="my-icon" :class="item.icon"></i>
            <p>{{item.icon}}</p>
          </li>
        </ul>
        <ul v-else class="select-icon">
          <li v-for="(item,index) in iconfonts" :key="index" @click="selectIcon(item)">
            <i class="iconfont my-icon" :class="item.icon"></i>
            <p>{{item.icon}}</p>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "CustomIcon",
    data() {
      return {
        iconSize: 40,
        color: 'rgba(255, 69, 0, 0.68)',
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ],
        dialogVisible: false,

        iconType: 'elm',
        elmIcon: 'el-icon-edit',
        elmIcons: [
          {icon: 'el-icon-platform-eleme'},
          {icon: 'el-icon-eleme'},
          {icon: 'el-icon-delete-solid'},
          {icon: 'el-icon-delete'},
          {icon: 'el-icon-s-tools'},
          {icon: 'el-icon-setting'},
        ],
        iconfont: 'sass-QRcode',
        iconfonts: [
          {icon: 'sass-QRcode'},
          {icon: 'sass-rising'},
          {icon: 'sass-play'},
          {icon: 'sass-Notvisible'},
          {icon: 'sass-pic'},
          {icon: 'sass-editor'},
        ]
      }
    },
    mounted() {

    },
    methods: {
      /**
       * 显示 图标
       */
      showIcon(type) {
        this.iconType = type;
        this.dialogVisible = true;
      },
      /**
       * 选择图标
       */
      selectIcon(item) {
        if (this.iconType === 'elm') {
          this.elmIcon = item.icon;
        } else {
          this.iconfont = item.icon;
        }
        this.dialogVisible = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .CustomIcon {
    .my-row {
      padding: 5px;
    }
    .my-icon {
      font-size: 40px;
      vertical-align: middle;
    }
    .my-color {
      vertical-align: middle;
    }
    .select-icon {
      list-style: none;
      overflow: auto;
      padding: 0px;
      li {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
        float: left;
        width: 115px;
      }
      li:hover {
        background: #bcf2ef;
        color: #5cb6ff;
      }
    }
  }
</style>
