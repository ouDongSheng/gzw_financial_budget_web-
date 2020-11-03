<template>
<el-container>
  <el-header style='height:46px;width:101%'>
     <div style='padding-top:6px;margin-left:-16px;padding-left:16px;height:46px;width:101%;background:#fafbfc'>
       <!-- <el-button type="primary" size="small" class="el-icon-circle-plus-outline" @click="handleEdit()" act='add'> 新  增</el-button>-->
       <el-button type="success" size="small" class="el-icon-edit-outline" @click="handleEdit('edit')" act='edit'> 修  改</el-button>
       <el-button type="warning" size="small" class="el-icon-circle-close" @click="handleDelRow"> 删  除</el-button>
     </div>
  </el-header>
  <el-main>
  <!-- 
   统一设置设置表头居中在el-table中加 :header-cell-style="{'text-align':'center'}" 
   统一设置设置内容列居中 在el-table中加 :cell-style="{'text-align':'center'}"
   show-overflow-tooltip：当内容过长被隐藏时显示 tooltip(文字提示)
   selection-change：当选择项发生变化时会触发该事件
   cell-mouse-enter：当单元格 hover 进入时会触发该事件
   row-click：当某一行被点击时会触发该事件
   stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。
  -->
  <div style='padding-top:1px;background:green'>
  <el-table
    :data="tableData"
    border
    :stripe=true
    :header-cell-style="{background:'menu',color:'#606266','text-align':'center '}"
    :row-class-name="tableRowClassName" 
    style="width: 100%;border:green 0px solid;"
    :id='tableId'
    height="480">
    <el-table-column
      fixed="left"
      align="center"
      label="日期"
      :formatter="dateFormat"
      width="150">
       <template slot-scope="scope"><div :fieldType="scope.row.fieldType" :value="scope.row.date"> {{ scope.row.date }}</div></template>
    </el-table-column>
    <el-table-column
      fixed="left"
      align="center"
      label="姓名"
      width="120">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.name"> {{ scope.row.name }}</div></template>
    </el-table-column>
    <el-table-column
      label="省份"
      align="right"
      width="120">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.province"> {{ scope.row.province }}</div></template>
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.city"> {{ scope.row.city }}</div></template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.address"> {{ scope.row.address }}</div></template>
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.zip"> {{ scope.row.zip }}</div></template>
    </el-table-column>

    <el-table-column
      prop="zip1"
      label="邮编1"
      width="120">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.zip1"> {{ scope.row.zip1 }}</div></template>
    </el-table-column>

    <el-table-column
      prop="zip2"
      label="邮编2"
      width="120">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.zip2"> {{ scope.row.zip2 }}</div></template>
    </el-table-column>

    <el-table-column
      prop="zip3"
      label="邮编3"
      width="120">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.zip3"> {{ scope.row.zip3 }}</div></template>
    </el-table-column>

    <el-table-column
      prop="zip4"
      label="邮编4"
      width="120">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.zip4"> {{ scope.row.zip4 }}</div></template>
    </el-table-column>

  </el-table>
  </div>
  </el-main>
</el-container>
</template>

<script>
  export default {

    data() {
      return {
        tableId: "tableData",
        tableData: [
	{
          date: '2016-05-03',
          fieldType: '3',
          name: '王小虎2',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          zip1: '上海市普陀区金沙江路 1518 弄1',
          zip2: '上海市普陀区金沙江路 1518 弄2',
          zip3: '上海市普陀区金沙江路 1518 弄3',
          zip4: '上海市普陀区金沙江路 1518 弄4'
        },
	{
          date: '2016-05-01',
	  fieldType: '1',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          zip1: '上海市普陀区金沙江路 1518 弄1',
          zip2: '上海市普陀区金沙江路 1518 弄2',
          zip3: '上海市普陀区金沙江路 1518 弄3',
          zip4: '上海市普陀区金沙江路 1518 弄4'
        },
	{
          date: '2016-05-02',
	  fieldType: '1',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          zip1: '上海市普陀区金沙江路 1518 弄1',
          zip2: '上海市普陀区金沙江路 1518 弄2',
          zip3: '上海市普陀区金沙江路 1518 弄3',
          zip4: '上海市普陀区金沙江路 1518 弄4'
        },
	{
          date: '2016-05-06',
	  fieldType: '1',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          zip1: '上海市普陀区金沙江路 1518 弄1',
          zip2: '上海市普陀区金沙江路 1518 弄2',
          zip3: '上海市普陀区金沙江路 1518 弄3',
          zip4: '上海市普陀区金沙江路 1518 弄4'
        },
	{
          date: '2016-05-08',
	  fieldType: '1',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          zip1: '上海市普陀区金沙江路 1518 弄1',
          zip2: '上海市普陀区金沙江路 1518 弄2',
          zip3: '上海市普陀区金沙江路 1518 弄3',
          zip4: '上海市普陀区金沙江路 1518 弄4'
        },
	{
          date: '2016-05-11',
	  fieldType: '1',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          zip1: '上海市普陀区金沙江路 1518 弄1',
          zip2: '上海市普陀区金沙江路 1518 弄2',
          zip3: '上海市普陀区金沙江路 1518 弄3',
          zip4: '上海市普陀区金沙江路 1518 弄4'
        },
	{
          date: '2016-05-12',
	  fieldType: '1',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          zip1: '上海市普陀区金沙江路 1518 弄1',
          zip2: '上海市普陀区金沙江路 1518 弄2',
          zip3: '上海市普陀区金沙江路 1518 弄3',
          zip4: '上海市普陀区金沙江路 1518 弄4'
        },
	{
          date: '2016-05-15',
	  fieldType: '1',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          zip1: '上海市普陀区金沙江路 1518 弄1',
          zip2: '上海市普陀区金沙江路 1518 弄2',
          zip3: '上海市普陀区金沙江路 1518 弄3',
          zip4: '上海市普陀区金沙江路 1518 弄4'
        },
	{
          date: '2016-05-22',
	  fieldType: '1',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          zip1: '上海市普陀区金沙江路 1518 弄1',
          zip2: '上海市普陀区金沙江路 1518 弄2',
          zip3: '上海市普陀区金沙江路 1518 弄3',
          zip4: '上海市普陀区金沙江路 1518 弄4'
        },
	]
      }
    },

    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'info-row';
        }else
	{
	  return '';
	}
      },
      //有时候后台给你的字段和你要显示在表格列里的内容不一致,可以这样改
      dateFormat(row, column) {
        if (row.date === '2016-05-03') {
          return '正确'
        } else  {
          return row.date
        }
      },
      //el-table__fixed-header-wrapper 表头父级的DIV 的className
      //el-table__fixed-body-wrapper 左边数据表父级的DIV 的className
      //el-table__fixed-body-wrapper 整个数据表父级的DIV 的className
      
      handleEdit()
      {
         /*
         var evt = event||window.event;
	 var evObj = evt.srcElement||evt.target;
	 var tagName = evObj.tagName;
	 if(tagName==null) return;
	 tagName = tagName.toUpperCase();
	 if(tagName!='BUTTON') evObj = $(evObj).closest('button')[0];
	 if(evObj==null||evObj==undefined) return;
	 */
  
	 var tableObj = $(".el-table__body-wrapper").children('table')[0];
	
	 var rows = tableObj.rows.length;
	 var cells = 0;
	 var rowObj = null;
	 var cellObj = null;
	 var nodeObj = null;
	 var tagName='';
	 var height=0;
	 var fieldType='';
	 var value='';
	 
	 for(var i=0;i<rows;i++)
	 {
	    rowObj = tableObj.rows[i];
	    height = rowObj.offsetHeight;
	    rowObj.setAttribute("height",height+"px");
            cells = rowObj.cells.length;
	    
	    for(var j=2;j<cells;j++)
	    {
	       cellObj = rowObj.cells[j];
	       nodeObj = $(cellObj).children('div')[0];
	       if(nodeObj==null||nodeObj==undefined) continue;
	       tagName = nodeObj.tagName;
               if(tagName==null||tagName=='') continue;
	       tagName = tagName.toUpperCase();
	       if(tagName!='DIV') continue;
	       nodeObj = $(nodeObj).children('div')[0];
	       if(nodeObj==null||nodeObj==undefined) continue;
	       tagName = nodeObj.tagName;
	       if(tagName==null||tagName=='') continue;
	       tagName = tagName.toUpperCase();
	       if(tagName!='DIV') continue;
	       fieldType = nodeObj.getAttribute('fieldType');
	       if(fieldType==null||fieldType=='') continue;
	       value = nodeObj.getAttribute('value');
	       if(value==null) value='';
	       nodeObj.innerHTML="<div contenteditable='true' style='border:1px solid green;text-align:left;overflow:auto;width:98%;height:"+height+"px'>"+value+"</div>";
	    }
	 }
         
	 tableObj = $(".el-table__fixed-body-wrapper").children('table')[0];
	 rows = tableObj.rows.length;
	 
	 for(var i=0;i<rows;i++)
	 {
	    rowObj = tableObj.rows[i];
	    height = rowObj.offsetHeight;
	    rowObj.setAttribute("height",height+"px");
            cells = rowObj.cells.length;
	    
	    for(var j=0;j<2;j++)
	    {
	       cellObj = rowObj.cells[j];
	       nodeObj = $(cellObj).children('div')[0];
	       if(nodeObj==null||nodeObj==undefined) continue;
	       tagName = nodeObj.tagName;
               if(tagName==null||tagName=='') continue;
	       tagName = tagName.toUpperCase();
	       if(tagName!='DIV') continue;
	       nodeObj = $(nodeObj).children('div')[0];
	       if(nodeObj==null||nodeObj==undefined) continue;
	       tagName = nodeObj.tagName;
	       if(tagName==null||tagName=='') continue;
	       tagName = tagName.toUpperCase();
	       if(tagName!='DIV') continue;
	       fieldType = nodeObj.getAttribute('fieldType');
	       if(fieldType==null||fieldType=='') continue;
	       value = nodeObj.getAttribute('value');
	       if(value==null) value='';
	       nodeObj.innerHTML="<div contenteditable='true' style='border:1px solid green;text-align:left;overflow:auto;width:98%;height:"+height+"px'>"+value+"</div>";
	    }
	 }
      },

      handleDelRow()
      {
        
        
      },


    },

  }
</script>
<style>
.el-table .info-row {
   color:red;
   text-align:center !important;
   background-color: green !important;
 }

 .gutter
 {
    background: menu !important;
 }

</style>