<template>
<div>
   <table style='width:100%'>
     <tr>
       <td width='50%'>
        <el-card class="box-card">
          <div slot="header" style='height:32px;padding-left:8px;padding-top:12px' class="clearfix el-button el-button--success">
            <span>通知公告</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
           {{'列表内容 ' + o }}
          </div>
        </el-card>
       </td>
       <td width='50%'>
        <el-card class="box-card">
          <div slot="header" style='height:32px;padding-left:8px;padding-top:12px' class="clearfix;el-button el-button--primary">
           <span>待设置企业</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
           {{'列表内容 ' + o }}
          </div>
        </el-card>
       </td>
     </tr>
   </table>
</div>

</template>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 14px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .el-card__header
  {
     padding:0px;
     margin:4px
  }
</style>