<template>
<el-container>
  <el-header style='height:46px;width:101%'>
     <div style='padding-top:6px;margin-left:-16px;padding-left:16px;height:46px;width:101%;background:#fafbfc'>
       <el-button type="primary" size="small" class="el-icon-circle-plus-outline" @click="handleAdd();centerDialogVisible = true;"> 新  增</el-button>
       <el-button type="success" size="small" class="el-icon-edit-outline" @click="handleEdit"> 修  改</el-button>
       <el-button type="warning" size="small" class="el-icon-circle-close" @click="handleDelRow"> 删  除</el-button>
     </div>
  </el-header>
  <el-main>
<template>
  <div>
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
      editData: [
          {
	    date:{
              value: '2016-05-05',
	      fieldType: '1',
	      align: 'center',
	    },

	    name:{
              value: '王小虎2',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海1',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海2',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200333',
	      fieldType: '3',
	      align: 'center',
	    }
         },
	
      ],

      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期',
	    fieldType: '3',
	    align: 'center',
	    width: '300',
	    fixed: true
          },
          {
            label: '配送信息',
	    align: 'center',
	    width: '530',

            children: [
              {
                prop: 'name',
                label: '姓名',
	        fieldType: '3',
	        align: 'center',
		width: '80',
              },
              {
                label: '地址',
	        align: 'center',
                children: [
                  {
                    prop: 'province',
                    label: '省份',
	            fieldType: '3',
	            align: 'center',
		    width: '150',
                  },
                  {
                    prop: 'city',
                    label: '市区',
	            fieldType: '3',
	            align: 'center',
		    width: '150'
                  },
                  {
                    prop: 'address',
                    label: '地址',
	            fieldType: '3',
	            align: 'center',
		    width: '150'
                  }
                ]
              }
            ]
          },
          {
            prop: 'date',
            label: '日期2',
	    fieldType: '3',
	    align: 'center',
	    width: '150'
          },
          {
            prop: 'date',
            label: '日期2',
	    fieldType: '3',
	    align: 'center',
	    width: '150'
          },
        ],

        data: [
          {
	    date:{
              value: '2016-05-03',
	      fieldType: '1',
	      align: 'center',
	    },

	    name:{
              value: '王小虎1',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200333',
	      fieldType: '3',
	      align: 'center',
	    }
          },

          {
	    date:{
              value: '2016-05-05',
	      fieldType: '1',
	      align: 'center',
	    },

	    name:{
              value: '王小虎2',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海1',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海2',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200333',
	      fieldType: '3',
	      align: 'center',
	    }
          },

          {
	    date:{
              value: '2016-05-07',
	      fieldType: '1',
	      align: 'center',
	    },
	    name:{
              value: '王小虎3',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海3',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海33',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号22',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200332333',
	      fieldType: '3',
	      align: 'center',
	    }
          },

          {
	    date:{
              value: '2016-05-07',
	      fieldType: '1',
	      align: 'center',
	    },
	    name:{
              value: '王小虎3',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海3',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海33',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号22',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200332333',
	      fieldType: '3',
	      align: 'center',
	    }
          },

          {
	    date:{
              value: '2016-05-07',
	      fieldType: '1',
	      align: 'center',
	    },
	    name:{
              value: '王小虎3',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海3',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海33',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号22',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200332333',
	      fieldType: '3',
	      align: 'center',
	    }
          },

          {
	    date:{
              value: '2016-05-07',
	      fieldType: '1',
	      align: 'center',
	    },
	    name:{
              value: '王小虎3',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海3',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海33',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号22',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200332333',
	      fieldType: '3',
	      align: 'center',
	    }
          },

          {
	    date:{
              value: '2016-05-07',
	      fieldType: '1',
	      align: 'center',
	    },
	    name:{
              value: '王小虎3',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海3',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海33',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号22',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200332333',
	      fieldType: '3',
	      align: 'center',
	    }
          },

          {
	    date:{
              value: '2016-05-07',
	      fieldType: '1',
	      align: 'center',
	    },
	    name:{
              value: '王小虎3',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海3',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海33',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号22',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200332333',
	      fieldType: '3',
	      align: 'center',
	    }
          },

          {
	    date:{
              value: '2016-05-07',
	      fieldType: '1',
	      align: 'center',
	    },
	    name:{
              value: '王小虎3',
	      fieldType: '3',
	      align: 'center',
	    },
	    province:{
              value: '上海3',
	      fieldType: '3',
	      align: 'center',
	    },
    	    city:{
              value: '上海33',
	      fieldType: '3',
	      align: 'center',
	    },
            address:{
              value: '上海市普陀区金沙江路 1518号22',
	      fieldType: '3',
	      align: 'center',
	    },
            zip:{
              value: '200332333',
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