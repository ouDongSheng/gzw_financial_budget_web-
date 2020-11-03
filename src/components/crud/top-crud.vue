<template>
  <div>
      <div class="header-btn">
        <div @click="handleAdd">
          <i class="el-icon-tickets"></i>
          <span>新增</span>
        </div>
        <div @click="handleEdit(null)">
          <i class="el-icon-edit"></i>
          <span>编辑</span>
        </div>
        <div>
          <i class="el-icon-document"></i>
          <span>提交</span>
        </div>
        <div @click="handleView(null)">
          <i class="el-icon-tickets"></i>
          <span >查看</span>
        </div>
        <div @click="handleDelete" >
          <i class="el-icon-delete"></i>
          <span>删除</span>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
  props:{
    list:{
      type:Object
    }
  },
  data() {
    return {
      nodeList:this.$props.list,
    }
  },
  methods: {
    rowDelete(row) {
       this.$parent.crud.rowDel(this.list)
    },
    handleEdit(row) {
      if (!this.list) return this.$message.warning('请选择至少一条数据');
      this.$parent.crud.rowEdit(this.list)
    },
    handleView(row) {
      this.$parent.crud.rowView(this.list)
    },
    handleExcel(row) {
      this.$parent.crud.rowExcel(row)
    },
    handleAdd() {
      this.$parent.crud.rowAdd()
    },
    handleDelete() {
      this.$emit('handleDelete');
    }
  }

  }
</script>

<style scoped="scoped" lang="scss">
  .header-btn>div {
    display: inline-block;
    padding: 10px 15px;
    cursor:pointer;
    i{
      margin-right: 5px;

    }
    i:nth-child(1) {
      color:#1177EA;
    }
    &:nth-child(2) i {
      color:#686AD3;
    }
    &:nth-child(3) i {
      color:#58D2E6;
    }
    &:nth-child(4) i {
      color:#99D264;
    }
    &:nth-child(5) i {
      color:#FF6D6D;
    }
     span {
       font-family: MicrosoftYaHei;
       font-size: 14px;
       color: #435B76;
     }
   }
</style>
