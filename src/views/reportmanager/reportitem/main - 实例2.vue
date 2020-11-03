<template>
<el-container>
  <el-header style='height:46px;width:101%'>
     <div style='padding-top:6px;margin-left:-16px;padding-left:16px;height:46px;width:101%;background:#fafbfc'>
       <el-button type="primary" size="small" class="el-icon-circle-plus-outline" @click="handleAdd;centerDialogVisible = true;"> 新  增</el-button>
       <el-button type="success" size="small" class="el-icon-edit-outline" @click="handleEdit"> 修  改</el-button>
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
    height="480">
    <el-table-column
      fixed="left"
      align="center"
      width="150">
      <template slot="header" slot-scope="slot">
	<div fieldType='3' field='name'>日期</div>
      </template>
       <template slot-scope="scope"><div :fieldType="scope.row.date.fieldType" :value="scope.row.date.value" :align="scope.row.date.align">{{ scope.row.date.value }}</div></template>
    </el-table-column>
    <el-table-column
      fixed="left"
      align="center"
      prop="name"
      width="120">
      <template slot="header" slot-scope="slot">
	<div fieldType='3' field='name'>姓名</div>
      </template>
      <template slot-scope="scope"><div :fieldType="scope.row.name.fieldType" :value="scope.row.name.value" :align="scope.row.name.align">{{ scope.row.name.value }}</div></template>
    </el-table-column>
    <el-table-column
      label="省份"
      align="right"
      width="120">
      <template slot-scope="scope"><div :fieldType="scope.row.province.fieldType" :value="scope.row.province.value" :align="scope.row.province.align">{{ scope.row.province.value }}</div></template>
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
      <template slot-scope="scope"><div :fieldType="scope.row.city.fieldType" :value="scope.row.city.value" :align="scope.row.city.align">{{ scope.row.city.value }}</div></template>
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="300">
      <template slot-scope="scope"><div :fieldType="scope.row.age.fieldType" :value="scope.row.age.value" :align="scope.row.age.align">{{ scope.row.age.value }}</div></template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
      <template slot-scope="scope"><div :fieldType="scope.row.address.fieldType" :value="scope.row.address.value" :align="scope.row.address.align">{{ scope.row.address.value }}</div></template>
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
      <template slot-scope="scope"><div :fieldType="scope.row.zip.fieldType" :value="scope.row.zip.value" :align="scope.row.zip.align">{{ scope.row.zip.value }}</div></template>
    </el-table-column>

   

  </el-table>
  </div>

<el-dialog
  title="新增项目"
  :visible.sync="centerDialogVisible"
  width="96%"
  top="5vh"
  >
  <div style='padding-top:10px;margin-left:-16px;padding-left:16px;height:46px;width:101%;background:#fafbfc'>
     <el-button type="primary" size="small" class="el-icon-circle-plus-outline" @click="addRow"> 新增行</el-button>
     <el-button type="warning" size="small" class="el-icon-circle-close" @click="delRow"> 删除行</el-button>
  </div>
<div style='margin-left:-16px;height:300px'>
<el-table
    :data="editData"
    border
    :stripe=true
    :header-cell-style="{background:'menu',color:'#606266','text-align':'center '}"
    :row-class-name="tableRowClassName" 
    style="width: 100%;border:green 0px solid;"
    :id="editTable"
    height="300">
    <el-table-column
      fixed="left"
      align="center"
      prop="date"
      width="150">
      <template slot="header" slot-scope="slot">
	  <div fieldType='1' field='A1'>*日期</div>
      </template>
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
      prop="age"
      label="年龄"
      width="300">
      <template slot-scope="scope"><div :fieldType='scope.row.fieldType' :value="scope.row.age"> {{ scope.row.age }}</div></template>
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


  </el-table>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </el-main>
</el-container>
</template>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false,
	editTable:"editTable",
        editData: [],
        tableData: [
	{
	  date:{
	    value: '2016-05-03',
	    fieldType: '3',
            align: 'center',
            fieldAsValue: ''
	  },
	  name:{
	    value: '王小虎2',
	    fieldType: '3',
            align: 'center',
            fieldAsValue: ''
	  },

	  province:{
	    value: '上海',
	    fieldType: '3',
            align: 'center',
            fieldAsValue: ''
	  },
	  city:{
	    value: '普陀区',
	    fieldType: '3',
            align: 'center',
            fieldAsValue: ''
	  },

	  age:{
	    value: '100',
	    fieldType: '3',
            align: 'center',
            fieldAsValue: ''
	  },

	  address:{
	    value: '上海市普陀区金沙江路1',
	    fieldType: '3',
            align: 'center',
            fieldAsValue: ''
	  },

	  zip:{
	    value: '1032440',
	    fieldType: '3',
            align: 'center',
            fieldAsValue: ''
	  },
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

      handleAdd()
      {
      },
      
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
	       nodeObj.innerHTML="<div contenteditable='true' style='border:1px solid green;text-align:left;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div>";
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
	       nodeObj.innerHTML="<div contenteditable='true' style='background:white !important;border:1px solid green;text-align:left;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div>";
	    }
	 }
      },

      handleDelRow()
      {
        
        
      },

      addRow()
      {
	 var divObj = $("#editTable").find(".el-table__body-wrapper")[0];
	 if(divObj==null||divObj==undefined) return;
         var tObj = divObj.childNodes[0];
	 if(tObj==null||tObj==undefined) return;
	 var rows = tObj.rows.length;

	 divObj = $("#editTable").find(".el-table__fixed-body-wrapper")[0];
	 if(divObj==null||divObj==undefined) return;
         var leftTableObj = divObj.childNodes[0];
	 if(leftTableObj==null||leftTableObj==undefined) return;
         
	 var rowObj = null;
	 var leftRowObj = null;
	 var cellObj = null;
	 var leftCellObj = null;
	 var height=40;
	 var value = '';

	 leftRowObj = leftTableObj.insertRow(rows);
	 leftRowObj.setAttribute("height",height+"px");

	 rowObj = tObj.insertRow(rows);
	 rowObj.setAttribute("height",height+"px");
	 rows++;

	 leftCellObj=leftRowObj.insertCell(0);
	 cellObj=rowObj.insertCell(0);
	 leftCellObj.innerHTML="<div class='cell'><div contenteditable='true' style='background:white !important;border:1px solid green;text-align:left;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div></div>";
	 cellObj.innerHTML=leftCellObj.innerHTML;

	 leftCellObj=leftRowObj.insertCell(1);
	 cellObj=rowObj.insertCell(1);
	 leftCellObj.innerHTML="<div class='cell'><div contenteditable='true' style='background:white !important;border:1px solid green;text-align:left;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div></div>";
	 cellObj.innerHTML=leftCellObj.innerHTML;

	 leftCellObj=leftRowObj.insertCell(2);
	 cellObj=rowObj.insertCell(2);
	 leftCellObj.innerHTML="<div class='cell'><div contenteditable='true' style='background:white !important;border:1px solid green;text-align:left;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div></div>";
	 cellObj.innerHTML=leftCellObj.innerHTML;

	 leftCellObj=leftRowObj.insertCell(3);
	 cellObj=rowObj.insertCell(3);
	 leftCellObj.innerHTML="<div class='cell'><div contenteditable='true' style='background:white !important;border:1px solid green;text-align:left;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div></div>";
	 cellObj.innerHTML=leftCellObj.innerHTML;
	 

      },

      delRow()
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