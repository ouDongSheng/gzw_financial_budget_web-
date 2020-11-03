<template>
  <!--
   row-key：行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的;
            类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function
   fit：列的宽度是否自撑开
   stripe：是否为斑马纹 table
   type：对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；
         如果设置了 expand 则显示为一个可展开的按钮
   v-loading：在Vue中，在表达式为true时，显示加载中，直到请求到数据后消失。
   
  -->
  <el-table v-loading="loading" :data="tableData" border style="width: 100%" row-key="id" fit stripe>
    <el-table-column align="center" fixed="left" type="index" label="序号" width="50" />
    <el-table-column align="center" fixed="left" prop="name" label="分校名称" />

    <el-table-column v-for="(planItem, index) in planList" :key="index" align="center" :label="planItem.planLable">
      <el-table-column v-for="(stageItem, indexChild) in planItem.stageList" :key="index+'-'+indexChild" align="center" :label="stageItem.stageLable">
        <template slot-scope="scope">
          <span v-if="scope.row.isEditing">
            <el-input v-model="scope.row.planList[index].stageList[indexChild].value" size="mini" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
          </span>
          <span v-else>{{ scope.row.planList[index].stageList[indexChild].value }}</span>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column align="center" fixed="right" label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleData(scope.row, scope.$index)">{{ scope.row.isEditing?'保存':"修改" }}</el-button>
        <el-button v-if="!scope.row.isEditing" size="mini" type="danger" @click="deleteData(scope.row, scope.$index)">删除</el-button>
        <el-button v-else size="mini" @click="cancelEdit(scope.row, scope.$index)">取消</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {      
      loading: false,
      // 表格组件 列表数据对象
      tableData: [],
      planList: [],
      editRowJson: ''
    };
  },
  created() {
    this.initData();
  },

  methods: {
    /**
     * @method initData
     * @description 初始化数据
     */
    initData() {
      this.getList();
    },
    /**
     * @description 获取列表
     * @method getList
     */
    getList() {
      const list = [
        {
          id: '123',
          name: '学校1',
          planList: [
            {
              planLable: '计划目标',
              stageList: [
                { stageLable: '第一阶段', value: '100' },
                { stageLable: '第二阶段', value: '200' },
                { stageLable: '第三阶段', value: '300' },
                { stageLable: '第四阶段', value: '400' }
              ]
            },
            {
              planLable: '基本目标',
              stageList: [
                { stageLable: '第一阶段', value: '10' },
                { stageLable: '第二阶段', value: '20' },
                { stageLable: '第三阶段', value: '30' },
                { stageLable: '第四阶段', value: '40' }
              ]
            },
            {
              planLable: '冲刺目标',
              stageList: [
                { stageLable: '第一阶段', value: '1000' },
                { stageLable: '第二阶段', value: '2000' },
                { stageLable: '第三阶段', value: '3000' },
                { stageLable: '第四阶段', value: '4000' }
              ]
            }
          ]
        },
        {
          id: '456',
          name: '学校2',
          planList: [
            {
              planLable: '计划目标',
              stageList: [
                { stageLable: '第一阶段', value: '1001' },
                { stageLable: '第二阶段', value: '2001' },
                { stageLable: '第三阶段', value: '3001' },
                { stageLable: '第四阶段', value: '4001' }
              ]
            },
            {
              planLable: '基本目标',
              stageList: [
                { stageLable: '第一阶段', value: '101' },
                { stageLable: '第二阶段', value: '201' },
                { stageLable: '第三阶段', value: '301' },
                { stageLable: '第四阶段', value: '401' }
              ]
            },
            {
              planLable: '冲刺目标',
              stageList: [
                { stageLable: '第一阶段', value: '10001' },
                { stageLable: '第二阶段', value: '20001' },
                { stageLable: '第三阶段', value: '30001' },
                { stageLable: '第四阶段', value: '40001' }
              ]
            }
          ]
        }
      ];
      //   拿到列表数据
      this.tableData = list;
      this.planList = (list[0] && list[0]['planList']) || [];
    },
    /**
     * @method handleData
     * @description 编辑或者保存数据
     */
    handleData(row, index) {
      // 如果其他行正在编辑，必须先保存
      for (const schoolItem of this.tableData) {
        if (schoolItem.isEditing && schoolItem.id !== row.id) {
          this.$message({
            type: 'info',
            message: '请先保存正在编辑的行'
          });
          return;
        }
      }
      if (row.isEditing) {
        // 保存
        for (const planItem of row.planList) {
          // 有数据为空则不保存
          for (const stageItem of planItem.stageList) {
            if (stageItem.value === '') {
              this.$message({
                type: 'info',
                message: '数据不能为空'
              });
              return;
            }
          }
        }
        this.$set(row, 'isEditing', false)
      } else {
        // 编辑
        this.editRowJson = JSON.stringify(row);
        this.$set(row, 'isEditing', true)
      }
    },
    /**
     * @method cancelEdit
     * @description 退出编辑
     */
    cancelEdit(row, index) {
      var editRow = JSON.parse(this.editRowJson);
      row.planList = editRow.planList;
      row.isEditing = !row.isEditing;
    },
    /**
     * @method deleteData
     * @description 点击删除
     */
    deleteData(row, index) {
      this.$confirm('是否删除本条?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.tableData.splice(index, 1);
      })
      .catch(err => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  }
};
</script>