<template>
<el-container>
  <el-header style='height:46px;width:101%;align:right'>
     <div style='padding-top:6px;margin-left:-16px;padding-left:16px;height:46px;width:101%;background:#fafbfc;align:right'>
       <table style='width:101%'>
         <tr>
	   <td></td>
	   <td width='78px'><el-button type="primary" size="small" class="el-icon-circle-plus-outline" @click="handleAdd();centerDialogVisible = true;"> 新  增</el-button></td>
	   <td width='78px'><el-button type="success" size="small" class="el-icon-edit-outline" @click="handleEdit"> 修  改</el-button></td>
	   <td width='78px'><el-button type="warning" size="small" class="el-icon-circle-close" @click="handleDelRow"> 删  除</el-button></td>
           <td width='30px'>&nbsp;</td>
	  </tr>
	</table>
     </div>
  </el-header>
  <el-main>
<template>
  <div style='width:99%;align:center'>
    <lb-table :column="tableData.column"
      :data="tableData.data"
      id='dateTable'
      height="500"
      border>
    </lb-table>
  </div>
</template>
<el-dialog 
  title="新增项目"
  :visible.sync="centerDialogVisible"
  width="90%"
  top="5vh"
  >
  <div style='padding-top:10px;margin-left:-16px;padding-left:16px;height:46px;width:101%;background:#fafbfc'>
     <el-button type="primary" size="small" class="el-icon-circle-plus-outline" @click="addRow();centerDialogVisible=false;centerDialogVisible=true;"> 新增行</el-button>
     <el-button type="warning" size="small" class="el-icon-circle-close" @click="delRow"> 删除行</el-button>
  </div>
    <div style='margin-left:-16px'>
    <lb-table 
      :column="tableData.column"
      :data='editData'
      id="editTable"
      height="310"
      border>
    </lb-table>
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
import LbTable from '@/components/lb-table/lb-table'
export default {
  name: 'dataTable',
  components: {
    LbTable
  },
  data () {
    return {
      centerDialogVisible: false,
      editTable:"editTable",
      editData: [],

      tableData: {
        column: [
          {
            type: 'selection',
	    align: 'center',
	    width: '28',
	    fixed: true,
	    fieldType: '',
	    field: '',
            fieldAs: '',
	    fun: '',
	    expr: '',
	    dataFormat: '',
	    dataType: '',
	    inputWidth: '',
	    maxLength: '',
	    rows: '',
	    inputStyle: '',
	    dot: '',
	    defaultV: '',
	    fieldAsValue: '',
	    isRead: '',
          },
          {
            type: 'index',
            label: '序号',
	    fieldType: '9',
	    align: 'center',
	    width: '40',
	    fixed: true,
	    fieldType: '',
	    field: '',
            fieldAs: '',
	    fun: '',
	    expr: '',
	    dataFormat: '',
	    dataType: '',
	    inputWidth: '',
	    maxLength: '',
	    rows: '',
	    inputStyle: '',
	    dot: '',
	    defaultV: '',
	    fieldAsValue: '',
	    isRead: '',
          },
          {
            prop: 'date',
            label: '发布日期',
	    fieldType: '3',
	    align: 'center',
	    width: '100',
	    fixed: true,
	    fieldType: '',
	    field: '',
            fieldAs: '',
	    fun: '',
	    expr: '',
	    dataFormat: '',
	    dataType: '11111',
	    inputWidth: '',
	    maxLength: '',
	    rows: '',
	    inputStyle: '',
	    dot: '',
	    defaultV: '',
	    fieldAsValue: '',
	    isRead: '',
          },
          {
            prop: 'title',
            label: '标题',
            headerAlign: 'center',
	    width: '250',
	    fieldType: '',
	    field: '',
            fieldAs: '',
	    fun: '',
	    expr: '',
	    dataFormat: '',
	    dataType: '22222',
	    inputWidth: '',
	    maxLength: '',
	    rows: '',
	    inputStyle: '',
	    dot: '',
	    defaultV: '',
	    fieldAsValue: '',
	    isRead: '',
          },
          {
            prop: 'content',
            label: '内容',
	    fieldType: '3',
	    headerAlign: 'center',
	    width: '200',
	    fieldType: '',
	    field: '',
            fieldAs: '',
	    fun: '',
	    expr: '',
	    dataFormat: '',
	    dataType: '',
	    inputWidth: '',
	    maxLength: '',
	    rows: '',
	    inputStyle: '',
	    dot: '',
	    defaultV: '',
	    fieldAsValue: '',
	    isRead: '',
          },
          {
            prop: 'attachment',
            label: '附件列表',
	    headerAlign: 'center',
	    fieldType: '13',
	    width: '300',
	    render: (h,scope) => {
	      return (<div class='linkcss' domPropsInnerHTML={scope.row[scope.column.property].value}></div>);
	    }
          },
          {
            prop: 'publisher',
            label: '发布者',
	    fieldType: '3',
	    align: 'center',
	    width: '150',
	    fieldType: '',
	    field: '',
            fieldAs: '',
	    fun: '',
	    expr: '',
	    dataFormat: '',
	    dataType: '',
	    inputWidth: '',
	    maxLength: '',
	    rows: '',
	    inputStyle: '',
	    dot: '',
	    defaultV: '',
	    fieldAsValue: '',
	    isRead: '',
          },
          {
            prop: 'publish_date',
            label: '发布日期',
	    fieldType: '3',
	    align: 'center',
	    width: '150',
	    fieldType: '',
	    field: '',
            fieldAs: '',
	    fun: '',
	    expr: '',
	    dataFormat: '',
	    dataType: '',
	    inputWidth: '',
	    maxLength: '',
	    rows: '',
	    inputStyle: '',
	    dot: '',
	    defaultV: '',
	    fieldAsValue: '',
	    isRead: '',
          },

        ],

        data: [
          {

	    date:{
              value: '2020-05-03',
	      fieldType: '1',
	      align: 'center',
	      dataType: '5555'
	    },

	    title:{
              value: '深圳市国资委关于做好2021年度企业全面预算管理工作的通知',
	      fieldType: '3',
	      dataType: '556666'
	    },
	    content:{
              value: '',
	      fieldType: '3',
	      align: 'center',
	    },
    	    attachment:{
              value: "1）<a href='a.html'>深圳市国资委关于做好2021年度企业全面预算管理工作的通知.doc</a><br/>2）<a href='b.html'>2021年-2023年滚动经营计划编制提纲.doc</a>",
	      fieldType: '3',

	    },
            publisher:{
              value: '管理员',
	      fieldType: '3',
	      align: 'center',
	    },
            publish_date:{
              value: '2020-09-10',
	      fieldType: '3',
	      align: 'center',
	    }
          },

        ]
      }
    }
  },
  methods: {
      handleAdd()
      {

      },
      
      handleEdit()
      {
         
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
	    
	    for(var j=1;j<cells;j++)
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

	       if(height<40)  nodeObj.innerHTML="<input style='border:1px solid green;width:100%;height:99%'>"+value+"</div>";
	       else nodeObj.innerHTML="<div contenteditable='true'  style='border:1px solid green;text-align:left !important;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div>";
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
	    
	    for(var j=0;j<1;j++)
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
	       if(height<40)  nodeObj.innerHTML="<input style='border:1px solid green;width:100%;height:99%'>"+value+"</div>";
	       else nodeObj.innerHTML="<div contenteditable='true' style='border:1px solid green;text-align:left !important;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div>";
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
	 if(rows<2) $(".el-table__empty-block").remove();

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

	 leftCellObj=leftRowObj.insertCell(4);
	 cellObj=rowObj.insertCell(4);
	 leftCellObj.innerHTML="<div class='cell'><div contenteditable='true' style='background:white !important;border:1px solid green;text-align:left;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div></div>";
	 cellObj.innerHTML=leftCellObj.innerHTML;

	 leftCellObj=leftRowObj.insertCell(5);
	 cellObj=rowObj.insertCell(5);
	 leftCellObj.innerHTML="<div class='cell'><div contenteditable='true' style='background:white !important;border:1px solid green;text-align:left;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div></div>";
	 cellObj.innerHTML=leftCellObj.innerHTML;
	 
	 leftCellObj=leftRowObj.insertCell(6);
	 cellObj=rowObj.insertCell(6);
	 leftCellObj.innerHTML="<div class='cell'><div contenteditable='true' style='background:white !important;border:1px solid green;text-align:left;overflow:auto;width:100%;height:"+height+"px'>"+value+"</div></div>";
	 cellObj.innerHTML=leftCellObj.innerHTML;

	 //要加这个overflow ，否则新增行后，垂直滚动条不出现
	 var divObj = $("#editTable").find(".el-table__body-wrapper");
         if(divObj==null||divObj==undefined) return;
	 $(divObj).css("overflow","auto");
	
      },

      delRow()
      {
         
      },
  }
}
</script>

<style  scoped>
 .el-table__body-wrapper {overflow:auto !important;}

</style>