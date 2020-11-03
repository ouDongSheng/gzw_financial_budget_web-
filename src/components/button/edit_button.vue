<template>
  <div style='width:100%'>
    <table style='width:100%'>
      <tr>
         <td>&nbsp;</td>
	 <td width='80px'><el-button type="primary" size="small" class="el-icon-circle-plus-outline is-plain" @click="handleAdd"> 新  增</el-button></td>
	 <td width='80px'><el-button type="success" size="small" class="el-icon-edit-outline is-plain" @click="handleEdit"> 修  改</el-button></td>
	 <td width='80px'><el-button type="warning" size="small" class="el-icon-circle-close is-plain" @click="handleDelRow"> 删  除</el-button></td>
	 <td width='80px'><el-button type="button" size="small" class="el-button el-icon-document el-button--info is-plain" @click="handleDelRow"> 导  出</el-button></td>
      </tr>
    </table>
  </div>
</template>
<script>
 export default {
    name: 'edit-button',
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
</style>