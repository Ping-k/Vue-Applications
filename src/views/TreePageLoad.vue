<template>
  <div>
    <h3>Tree分页懒加载</h3>

    <div class="tree-page">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree :props="defaultProps"
               ref="treePage"
               :expand-on-click-node="false"
               node-key="id"
               :load="loadNode"
               lazy
               :default-expanded-keys="[0]"
               :render-content="renderContent"
               :filter-node-method="filterNode"
               @node-click="handleNodeClick">
      </el-tree>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TreePageLoad",
    data() {
      return {
        filterText: '',
        data: [{
          id: 1,
          label: '一级 0',
          children: [],
          isPage: true,
          isPageBtn: false,
        },{
          id: 2,
          label: '一级 1',
          children: [],
          isPage: true,
          isPageBtn: false,
        }],
        defaultProps: {
          children: 'children',
          label: 'label',
          isLeaf: 'leaf'
        }
      };
    },
    watch: {
      filterText(val) {
        this.$refs.treePage.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      loadNode(node, resolve) {
        console.log('懒加载节点：',node, node.level)
        if (node.level === 0) {
          return resolve(this.data);
        }

        if(node.level === 1){
          setTimeout(() => {
            let data = [];
            for (let i = 0; i < 5; i++) {
              data.push(
                {
                  id: (node.level + i + 1),
                  label: `二级 - ${node.level} - ${i + 1}`,
                  isPage: true,
                  isPageBtn: false,
                  count:10,
                  winNumber:5,
                  children: [
                    {
                      id: (node.level + i + 1 +1),
                      label: `三级 - ${node.level} - ${i + 1}`,
                      isPage: true,
                      isPageBtn: false,
                      count:10,
                      winNumber:5,
                      children: [
                        {
                          id: (node.level + i + 1 +1),
                          label: `四级 - ${node.level} - ${i + 1}`,
                          isPage: true,
                          isPageBtn: false,
                          count:10,
                          winNumber:5,
                          children: [],
                          leaf: false
                        }
                      ],
                      leaf: false
                    }
                  ],
                  leaf: false
                }
              )
            }
            data.push(
              {
                id: (node.level + 6),
                label: `点击加载更多`,
                children: [],
                isPage: false,
                isPageBtn: true,
                leaf: true
              }
            )
            console.log(data)
            resolve(data);
          }, 500);
        }
        // if (node.level > 3) return resolve([]);

        if(node.level ===2){
          return resolve(node.data.children);
        }
        if(node.level ===3){
          return resolve(node.data.children);
        }
        if(node.level>3){
          return resolve([]);
        }
      },
      renderContent(h, { node, data, store }) {
        if(data.isPageBtn){
          return(
            <span class="custom-tree-node">
            <span style="color:#409eff;font-size: 13px;">点击加载更多</span>
          </span>
          )
        }else{
          return(
              <span class="custom-tree-node">
              <span >{node.label}（<span style="color:#409eff;">{data.count}</span> / <span style="color:#409eff;">{data.winNumber}</span>）</span>
            </span>
          )
        }
      },
      handleNodeClick(data, node) {
        console.log('点击节点：', data);
        // console.log(node.parent);

        // 判断是否分页
        if(data.isPageBtn){
          console.log('分页加载。。。。')
          let obj = {
            id: (node.level + 6),
            label: `数据`,
            children: [],
            // isPage: true,
            // isPageBtn: false,
            // leaf: true
          }

          // 新增节点
          for (let i = 0; i < 5; i++) {
            let o = Object.assign({}, obj);
            o.id = o.id + i;
            this.$refs.treePage.append(o, node.parent);
          }

          // 新增分页按钮
          this.$refs.treePage.append({
            id: (node.level + 6 + 5),
            label: `点击加载更多`,
            children: [],
            isPage: false,
            isPageBtn: true,
            leaf: true
          }, node.parent);

          // 删除分页按钮
          this.$refs.treePage.remove(node, data);
        }else{
          console.log('选择节点。。。。')
        }
      }
    }
  }
</script>

<style scoped>
  .tree-page {
    padding: 10px;
    border: 1px solid #dcdcdc;
    width: 300px;
    height: 500px;
    overflow: auto;
    margin: 50px auto;
  }
</style>
