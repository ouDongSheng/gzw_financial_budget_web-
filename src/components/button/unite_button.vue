<template>
  <div style='width:100%'>
    <el-button type="primary" size="small" class="el-button is-plain" @click="handleAdd"> 数据上报检查</el-button>
    <el-button type="success" size="small" class="el-button is-plain" @click="handleEdit"> 审核下属</el-button>
    <el-button type="warning" size="small" class="el-button is-plain" @click="handleDelRow"> 数据汇总</el-button>
  </div>
</template>
<script>
 export default {
    name: 'unite-button',
    data () 
    {
      return {}
    },
    methods: 
    {
       handleAdd()
       {
          alert();
       },
       handleEdit()
       {
       },
       handleDelRow()
       {
       },
    },//end methods

 }
</script>
<style>
 .el-table__body-wrapper {overflow:auto !important;}
 .el-tabs__header {margin: 0 0 0 0px !important}
 .el-header {height:60px !important}
</style>