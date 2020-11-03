<template>
<el-container>
  <el-aside width="160px">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
    class="filter-tree"
    :data="epData"
    :props="defaultProps"
    default-expand-all
    :filter-node-method="filterNode"
    ref="tree">
    </el-tree>
    </el-aside>
    <el-main>
     <div style='padding-top:6px;margin-left:-16px;padding-left:16px;height:46px;width:99%;background: rgb(250, 251, 252);;align:right'>
       <template>
         <el-tabs type="border-card">
          <el-tab-pane label="审核企业申请">
            <div style='background:white;margin-top:0px;padding:0px;align:center;height:420px;width:100%'>
            <div style='width:100%;align:center;margin-top:10px;'>
            <table style='width:100%'>
             <tr>
	      <td></td>
	      <td width='280px'>申请日期从<input type='text' size='8'/>到<input type='text' size='8'/></td>
	      <td width='200px'>申请内容：<input type='text' size='12'/></td>
	      <td width='78px'>
	         <el-button type="success" plain class="el-icon-search" style='height:28px !important;padding:6px !important'> 查  询 </el-button>
              </td>
	      <td></td>
              <td width='60px'>
	         <el-button type="primary" class="el-icon-lock" style='height:28px !important;padding:6px !important'> 审  核 </el-button>
	      </td>
              <td width='8px'>&nbsp;</td>
             </tr>
            </table>
	    </div>
   
            <div style='width:100%;align:center;padding-top:6px'>
             <lb-table :column="tableData.column"
               :data="tableData.data"
               id='dateTable'
               height="380"
               border>
             </lb-table>
            </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="新增企业">
            <div style='background:white;margin-top:0px;padding:0px;align:center;height:420px;width:100%'>
            <div style='width:100%;align:center;margin-top:-10px;'>
            <table style='width:100%'>
             <tr>
	      <td>申请日期从<input type='text' size='8'/>到<input type='text' size='8'/></td>
	      <td>申请内容<input type='text' size='12'/></td>
	      <td></td>
	      <td width='78px'><el-button type="primary" size="small" class="el-icon-circle-plus-outline" @click="handleAdd();centerDialogVisible = true;"> 新  增</el-button></td>
	      <td width='78px'><el-button type="success" size="small" class="el-icon-edit-outline" @click="handleEdit"> 修  改</el-button></td>
	      <td width='78px'><el-button type="warning" size="small" class="el-icon-circle-close" @click="handleDelRow"> 删  除</el-button></td>
              <td width='30px'>&nbsp;</td>
             </tr>
            </table>
	    </div>
   
            <div style='width:100%;align:center;padding-top:6px'>
             <lb-table :column="tableData.column"
               :data="tableData.data"
               id='dateTable'
               height="380"
               border>
             </lb-table>
            </div>
            </div>
	  </el-tab-pane>
          <el-tab-pane label="修改企业层级">
            <div style='background:white;margin-top:0px;padding:6px;align:center;height:460px;width:100%'>
	      

            </div>
	  </el-tab-pane>
          <el-tab-pane label="退出并表">
            <div style='background:white;margin-top:0px;padding:6px;align:center;height:460px;width:100%'>
	    
            </div>
	  </el-tab-pane>

          <el-tab-pane label="产权系统企业列表">
            <div style='background:white;margin-top:0px;padding:6px;align:center;height:460px;width:100%'>
	    
            </div>
	  </el-tab-pane>

         </el-tabs>
       </template>
     </div>

  </el-main>

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
      editTable: 'editTable',
      activeName: 'first',
      data1: '',
      editData: [],

      filterText: '',

      tableData: {
        column: [
          {
            type: 'selection',
	    align: 'center',
	    width: '28',
	    fixed: true,
	    fieldType: '',
          },
          {
            type: 'index',
            label: '序号',
	    fieldType: '9',
	    align: 'center',
	    width: '40',
	    fixed: true,
	    fieldType: '',
          },
          {
            prop: 'date',
            label: '申请内容',
	    fieldType: '3',
	    align: 'center',
	    width: '100',
	    fixed: true,
	    fieldType: '',
          },
          {
            prop: 'title',
            label: '申请单位',
            headerAlign: 'center',
	    width: '250',
	    fieldType: '',
          },
          {
            prop: 'content',
            label: '申请日期',
	    fieldType: '3',
	    headerAlign: 'center',
	    width: '200',
	    fieldType: '',
          },

          {
            prop: 'publisher',
            label: '附件',
	    fieldType: '3',
	    align: 'center',
	    width: '150',
	    fieldType: '',
          },
          {
            prop: 'publish_date',
            label: '备注',
	    fieldType: '3',
	    align: 'center',
	    width: '150',
	    fieldType: '',
          },

        ],

        data: [],

        epData: [
	{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],

        defaultProps: {
          children: 'children',
          label: 'label'
        }


      }
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {

      filterNode(value, data) {
        if (!value) return true;
        return epData.label.indexOf(value) !== -1;
      },

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

<style>
 .el-table__body-wrapper {overflow:auto !important;}
 .el-tabs__header {margin: 0 0 0 0px !important}

</style>