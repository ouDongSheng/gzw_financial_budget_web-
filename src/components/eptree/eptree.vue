<template>
  <div class="treeContainer">
    <div
      v-show="isTree"
      class="companyTree"
      :style="{ width: width + 'px' }"
      v-loading="loading"
    >
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="searchInput"
        @blur="blurIpt"
	style='width:238px' 
      ></el-input>

      <div class="el-tree-node__content" style="padding-left: 0px;padding-top:6px;padding-bottom: 0px;">
        <span class="expanded el-tree-node__expand-icon el-icon-caret-right"></span>
        <span class="custom-tree-node">
        <span class="ft14">深圳市国资委</span>
        </span>
      </div>
 
      <el-tree
        :props="defaultProps"
        :data="data"
        ref="tree"
        node-key="id"
        :indent="28"
        :default-expanded-keys="[initId]"
        :highlight-current="true"
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node }"
          :title="node.label"
        >
          <span
            class="ft14"
            v-html="
              $xss(
                brightenKeyword(node.label, searchInput || treeComanyNameInput)
              )
            "
          ></span>
        </span>
      </el-tree>
    </div>
 
  </div>
</template>

<script>
//import {
//  getCompanyNodes
//} from "@/api/commonPublic/commonPublic";

export default {
  name: "ep-tree",
  props: {
    treeComanyNameInput: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      defaultProps: {
        label: "company",
        children: "children",
        isLeaf: "isLeaf",
      },
      searchInput: "",
      isTree: true,
      lastX: "",
      width: 250,
      data: [],
      dataManagement: [],
      loading: true,
      activeName: "first",
      tabIndex: 1,
      isFirstRequestSucceed: false,
      isSecondRequestSucceed: false,
    };
  },
  watch: {
    searchInput(val) {
      if (this.activeName === "first") {
        this.$refs.tree.filter(val);
      } else {
        this.$refs.treeTwo.filter(val);
      }
    },
    treeComanyNameInput(val) {
      this.$refs.tree.filter(val);
      if (val === "") this.getTreeData();
    },
    activeName(val) {
      if (!this.isSecondRequestSucceed && val === "second") {
        this.getTreeData();
      }
    },
  },
  computed: {
    initId() {
      // 初始企业id
      return 228;
    },
  },
  created() {
    this.getTreeData();
  },
  destroyed() {},
  methods: {
    handleClick(tab) {
      this.tabIndex = parseInt(tab.index);
    },

    getTreeData() {
      this.loading = true;
      /*
      getCompanyNodes()
        .then((res) => {
          const dataObj = res.data || {};
          const data = dataObj.data || [];
          if (this.activeName === "first") {
            this.data = data; //产权关系树
          } else {
            this.dataManagement = data; //管理关系树
          }
          this.handleCurrentNode(data);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.isFirstRequestSucceed = false;
          this.isSecondRequestSucceed = false;
        });*/


	var data = [{
          id: 1,
          company: '深圳市投资控股有限公司',
          children: [{
            id: 4,
            company: '二级 1-1',
            children: [{
              id: 9,
              company: '三级 1-1-1'
            }, {
              id: 10,
              company: '三级 1-1-2',
              children: [{
                id: 41,
                company: '四级1',
              },{
                id: 42,
                company: '四级2',
		isLeaf: '1',
	      }]
            }]
          }]
        }, {
          id: 2,
          company: '深业集团有限公司',
          children: [{
            id: 5,
            company: '二级 2-1'
          }, {
            id: 6,
            company: '二级 2-2'
          }]
        }, {
          id: 3,
          company: '深圳市地铁集团有限公司',
          children: [{
            id: 7,
            company: ''
          }, {
            id: 8,
            company: ''
          }]
        }, {
          id: 8,
          company: '深圳市机场（集团）有限公司',
          children: [{
	  }]
        }, {
          id: 8,
          company: '深圳市盐田港集团有限公司',
          children: [{
	  }]
        }, {
          id: 8,
          company: '深圳能源集团股份有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市水务（集团）有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市燃气集团股份有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳巴士集团股份有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市食品物资集团有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市创新投资集团有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市国有免税商品（集团）有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市特区建工集团有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市振业（集团）股份有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市特发集团有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市资本运营集团有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳国际控股有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市鲲鹏股权投资管理有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市特区建设发展集团有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市交易集团有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市东部公共交通有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市城市公共安全技术研究院有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市人才安居集团有限公司',
          children: [{}]
        }, {
          id: 8,
          company: '深圳市智慧城市科技发展集团有限公司',
          children: [{}]

        }];

	this.data=data;

	this.loading=false;

    },

    //搜索框失焦的时候收起列表
    blurIpt() {
      if (this.searchInput === "" && this.treeComanyNameInput === "")
        this.getTreeData();
    },

    //控制tree显示隐藏
    handleIstree() {
      this.isTree = !this.isTree;
      this.$emit("handleIstree", this.isTree);
    },

    //节点过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.company.indexOf(value) !== -1;
    },

    // 当前选中节点
    handleCurrentNode(data) {
      if (data.length > 0) {
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(data[0].id); //一定要加这个选中了否则样式没有出来
          this.handleNodeClick(data[0]);
          //请求过了就不在请求
          if (this.activeName === "first") {
            this.isFirstRequestSucceed = true;
          } else {
            this.isSecondRequestSucceed = true;
          }
        });
      }
    },

    // 节点点击事件，将item传出去
    handleNodeClick(data) {
      this.getqixinbaoEid(data);
    },

    /**
     *  关键字搜索改变颜色
     */
    brightenKeyword(val, keyword) {
      val = val + "";
      if (val.indexOf(keyword) !== -1 && keyword !== "") {
        return val.replace(
          keyword,
          '<font color="#78B929 ">' + keyword + "</font>"
        );
      } else {
        return val;
      }
    },

    // 选中搜索结果中的某一项
    handleSelect(item) {
      this.$refs.tree.setCurrentKey(item.id);
      // 第一个参数：外部监听的方法名，第二个参数：要传递的值
      this.$emit("monitorSelectCompany", item);
    }
  },
};
</script>

<style>
.companyTree .el-input {

  height: 10px;
  margin: 2px;
  padding-left: 6px;
}

 .el-tree
 {
    margin-top:0px;
    padding-top:0px;
    height:460px;
    overflow:auto;

 }

 .el-tree::-webkit-scrollbar
 {
   width:6px;
   height:6px;
 }

 .el-tree::-webkit-scrollbar-thumb {
      border-radius: 5px;
      -webkit-box-shadow: #d9d9d9;
      background: rgba(0,0,0,0.2);
      scrollbar-arrow-color:red;
 }
 .el-tree::-webkit-scrollbar-track {
      -webkit-box-shadow: #d9d9d9;
      border-radius: 0;
      background: rgba(0,0,0,0.1);
 }

 .el-input__inner
 {
   height:28px;
   line-height:28px;
 }

.companyTree .el-input__inner {
  background-color: #ebebeb;
  border: none;
  color: #000000;
  font-weight: normal;
}

.companyTree .el-tree {
  color: #000000;
  background-color: transparent;
  margin-bottom: 0px;
}

.companyTree .el-tree-node__content > .el-tree-node__expand-icon {
  padding: 0 6px 0 6px;
}

.companyTree .el-tree-node__label {
  text-overflow: ellipsis;
}

 .el-tree-node__content {
  height: 26px;
  color: #000000;
  padding-right: 3px;
}

.companyTree .el-tree-node.is-current > .el-tree-node__content {
  background-color: #f8edee !important;
  color: #c71a21;
}

.companyTree .is-leaf.el-tree-node__expand-icon.el-icon-caret-right {
  padding-left: 2px;
}

.el-tree-node > .el-tree-node__children {
  overflow: inherit;
}
/* 更改tree的箭头选中和不选中样式 */
.el-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  
.el-tree-node__expand-icon.el-icon-caret-right:before {
    background: url("../../assets/commonIcons/fold.png") no-repeat;
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    background-size: cover;
  }
  
.is-leaf.el-tree-node__expand-icon.el-icon-caret-right:before {
    content: '';
    width: 0;
    height: 0;
  }
  
.companyTree .is-leaf.el-tree-node__expand-icon.el-icon-caret-right:before {
    margin-left: 2px;
  }

.expanded.el-tree-node__expand-icon.el-icon-caret-right:before {
    background: url("../../assets/commonIcons/unfold.png") no-repeat;
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    background-size: cover;
  }

  /* 企业树搜索结果换行显示 */
  .el-autocomplete-suggestion li {
    white-space: inherit;
    line-height: 20px;
    padding: px 4px;
  }
  .el-autocomplete-suggestion li:hover {
    color: #78B929;
    background-color: #fafbfc;
  }
  .el-autocomplete-suggestion__wrap {
    padding: 0;
  }

  .el-tree-node {
    position: relative;
    margin-left: 6px;
  }
 
  .el-tree-node__children {
    margin-left: -17px;
  }

</style>

<style scoped>
.companyTree {
  margin-top: 0px;

  overflow: auto;
  background-color: #fafbfc;
  border-right: 1px solid #d9d9d9;
}

.treeContainer {
  height: 100%;
  position: relative;
}

.left0 {
  left: 5px;
}

.divider {
  width: 5px;
  height: 100%;
  background: #ccdbf0;
}
.ft14
{
   font-family: Tahoma;
   font-weight: normal;
   font-size: 14px;
}
</style>


