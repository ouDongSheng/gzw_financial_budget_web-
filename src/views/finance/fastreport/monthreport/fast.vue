<template>
<el-container>
  <el-aside width="252px">
    <table style='width:100%'>
       <tr height='33px'>
          <td>&nbsp;</td>
          <td width='38px' align='center'>年月</td>
	  <td width='80px'>
              <el-select v-model="year">
                 <el-option label="2021年" value="2021"></el-option>
                 <el-option label="2020年" value="2020"></el-option>
              </el-select>
          </td>
	  <td width='70px'>
             <el-select v-model="month">
                <el-option label="1月" value="01"></el-option>
                <el-option label="2月" value="02"></el-option>
                <el-option label="3月" value="03"></el-option>
                <el-option label="4月" value="04"></el-option>
                <el-option label="5月" value="05"></el-option>
                <el-option label="6月" value="06"></el-option>
                <el-option label="7月" value="07"></el-option>
                <el-option label="8月" value="08"></el-option>
                <el-option label="9月" value="09"></el-option>
                <el-option label="10月" value="10"></el-option>
                <el-option label="11月" value="11"></el-option>
                <el-option label="12月" value="12"></el-option>
             </el-select>
	  </td>
	  <td>&nbsp;</td>
       </tr>
       <tr>
          <td colspan='5'><ep-tree ></ep-tree></td>
       </tr>
    </table>
    
  </el-aside>
  <el-main>
    <div style='padding-top:6px;margin-left:-6px;padding-left:0px;height:99%;width:100%;background:#fafbfc;align:right'>
      <template>
        <el-container>
	   <el-header>
	      <table style='width:100%;background:#fafbfc'>
	        <tr>
		  <td width='340px'>
                         <el-tabs v-model="activeName" @tab-click="handleClick">
                         <el-tab-pane label="报表编制" name="editTab">

                         </el-tab-pane>
                         <el-tab-pane label="文档上传" name="docTab">

		         </el-tab-pane>
                         <el-tab-pane label="上报检查" name="checkTab">

                         </el-tab-pane>
                         <el-tab-pane label="审核下属" name="auditTab">

		         </el-tab-pane>
                         <el-tab-pane label="数据汇总" name="uniteTab">

		         </el-tab-pane>
                         </el-tabs>
		  </td>

		  <td valign='top' style='vertical-align: middle;'>
			  <table style='width:100%'>
			     <tr>
			       <td></td>
			       <td width='150px' align='center' style='font-weight:400;font-family: Tahoma;font-size: 13px;'>上报状态：<font color='red'>未上报</font></td>
			       <td width='46px' align='right' style='font-weight:400;font-family: Tahoma;font-size: 13px;'>单位&nbsp;</td>
			       <td width='60px'>
                                   <el-select v-model="unit">
				      <el-option label="元" value="1"></el-option>
                                      <el-option label="万元" value="10000"></el-option>
                                      
                                    </el-select>
                               </td>
			       <td width='20px'>&nbsp;</td>

			     </tr>
			  </table>
		  </td>
	
		</tr>
	        <tr height="45px">
		  <td style='background:menu;vertical-align:bottom;padding-left:6px;padding-bottom:6px;font-weight:400;font-family: Tahoma;font-size: 13px;'>
		    <b>位置：月度快报主表</b>&nbsp;&nbsp;<el-checkbox v-model="isAdj" @change='changeReortType' label="5">抵消表</el-checkbox>
		  </td>
	
		  <td style='background:menu;vertical-align:bottom;padding-bottom:6px'><edit-button ></edit-button></td>
		</tr>
	      </table>
	   </el-header>
           <el-main>
             <div style='width:100%;align:center;padding-top:6px'>
               <lb-table :column="tableData.column"
               :data="tableData.data"
               id='dateTable'
               height="416"
               border>
               </lb-table>
             </div>
	
              <div style='width:99%;align:center;padding-top:0px;padding-left:6px;margin-left:0px;background:menu;overflow-x:hidden'>
	      <table style='width:100%;'>
	         <tr>
		   <td width='140px'>
		   <div class='table-bar' style='height:30px;width:100%;margin-top:0px;margin-top:0px;margin-bottom:11px;'>
		   <table style='width:100%;'>
		    <tr>
		   <td width='32px' height='30px' align='center'>
		     <el-popover
		     placement="top-start"
		     title=""
		     width="500"
		     trigger="hover"
		     content="">
		     <div style='width:100%;align:center;padding-top:6px'>
		       <table style='width:100%'>
		          <tr height='28px'><td>1)资产负债表</td></tr>
			  <tr height='28px'><td>2)利润表</td></tr>
			  <tr height='28px'><td>3)利润表</td></tr>
			  <tr height='28px'><td>3)利润表</td></tr>
			  <tr height='28px'><td>3)利润表</td></tr>
			  <tr height='28px'><td>3)利润表</td></tr>
			  <tr height='28px'><td>3)利润表</td></tr>
			  <tr height='28px'><td>3)利润表</td></tr>
			  <tr height='28px'><td>3)利润表</td></tr>
		       </table>
		     </div>
		     <el-button slot="reference" style='padding:1px;width:28px;height:28px;background:#edf0f5;vertical-align:bottom'>
		     <img height='24px' width='21px' src='../../../../assets/commonIcons/detail.png'/>
		     </el-button>
		     </el-popover>

		      <!--
		      <button type="button" class="el-button el-button--info is-plain" style='padding:1px;width:28px;height:28px;background:#edf0f5;vertical-align:bottom'>
		       <img height='24px' width='21px' src='../../../../assets/commonIcons/detail.png'/>
		       </button>-->
		   </td>
		   <td width='26px' height='30px' align='center'>
		      <button type="button" class="el-button el-button--info is-plain" style='padding:1px;height:28px;background:#edf0f5;vertical-align:bottom'>
		       <img height='24px' width='21px' src='../../../../assets/commonIcons/first.png'/>
		       </button>
		   </td>
		   <td width='26px' height='30px' align='center'>
		      <button type="button" class="el-button el-button--info is-plain" style='padding:1px;height:28px;background:#edf0f5;vertical-align:bottom'>
		       <img height='24px' width='21px' src='../../../../assets/commonIcons/pre.png'/>
		       </button>
		   </td>
		   <td width='26px' height='30px' align='center'>
		      <button type="button" class="el-button el-button--info is-plain" style='padding:1px;height:28px;background:#edf0f5;vertical-align:bottom'>
		       <img height='24px' width='21px' src='../../../../assets/commonIcons/next.png'/>
		       </button>
		   </td>
		   <td width='26px' height='30px' align='center'>
		      <button type="button" class="el-button el-button--info is-plain" style='padding:1px;height:28px;background:#edf0f5;vertical-align:bottom'>
		       <img height='24px' width='21px' src='../../../../assets/commonIcons/last.png'/>
		       </button>
		   </td>
		   </tr>
		   </table>
		   </div>
		   </td>
		  
		   <td valign='top' style='padding-left:3px'>
		     <div class='table-bar' style='height:36px;width:720px;margin-top:0px;margin-bottom:4px;overflow-x:auto;overflow-y:hidden;'>
		       <table style='width:100%;'>
		         <tr>
		          <td width='26px' height='28px' align='center' style='padding:1px'>
		            <button type="button" class="el-button el-button--info is-plain" style='padding-left:4px;padding-top:6px !important;padding-right:4px;padding-bottom:10px !important;height:28px;vertical-align:bottom'>
			    月度快报主表
			    </button>
		          </td>
		          <td width='26px' height='28px' align='center' style='padding:1px'>
		            <button type="button" class="el-button el-button--info is-plain" style='padding-left:4px;padding-top:6px !important;padding-right:4px;padding-bottom:10px !important;height:28px;vertical-align:bottom'>
			    快报填报说明
			    </button>
		          </td>
		          <td width='26px' height='28px' align='center' style='padding:1px'>
		            <button type="button" class="el-button el-button--info is-plain" style='padding-left:4px;padding-top:6px !important;padding-right:4px;padding-bottom:10px !important;height:28px;vertical-align:bottom'>
			    快报填报说明
			    </button>
		          </td>
		          <td width='26px' height='28px' align='center' style='padding:1px'>
		            <button type="button" class="el-button el-button--info is-plain" style='padding-left:4px;padding-top:6px !important;padding-right:4px;padding-bottom:10px !important;height:28px;vertical-align:bottom'>
			    快报填报说明
			    </button>
		          </td>
		          <td width='26px' height='28px' align='center' style='padding:1px'>
		            <button type="button" class="el-button el-button--info is-plain" style='padding-left:4px;padding-top:6px !important;padding-right:4px;padding-bottom:10px !important;height:28px;vertical-align:bottom'>
			    快报填报说明
			    </button>
		          </td>

		          <td width='26px' height='28px' align='center' style='padding:1px'>
		            <button type="button" class="el-button el-button--info is-plain" style='padding-left:4px;padding-top:6px !important;padding-right:4px;padding-bottom:10px !important;height:28px;vertical-align:bottom'>
			    快报填报说明
			    </button>
		          </td>
		          <td width='26px' height='28px' align='center' style='padding:1px'>
		            <button type="button" class="el-button el-button--info is-plain" style='padding-left:4px;padding-top:6px !important;padding-right:4px;padding-bottom:10px !important;height:28px;vertical-align:bottom'>
			    快报填报说明
			    </button>
		          </td>
		          <td width='26px' height='28px' align='center' style='padding:1px'>
		            <button type="button" class="el-button el-button--info is-plain" style='padding-left:4px;padding-top:6px !important;padding-right:4px;padding-bottom:10px !important;height:28px;vertical-align:bottom'>
			    快报填报说明
			    </button>
		          </td>

			  <td></td>
			 </tr>
		       </table>
		     </div>
		   </td>
		 </tr>
	      </table>
	      </div>
	   </el-main>
	</el-container>
      </template>
    </div>
  </el-main>
</el-container>
</template>

<script>
import epTree from '@/components/eptree/eptree'
import uniteButton from '@/components/button/unite_button'
import editButton from '@/components/button/edit_button'
import LbTable from '@/components/lb-table/lb-table'
export default {
  components: {
    epTree,
    uniteButton,
    editButton,
    LbTable
  },

  data () {
    return {
      centerDialogVisible: false,
      isAdj: false,
      reportType: '2',
      year: '2021',
      month: '10',
      unit: '10000',
      tableData: 
      {
         column: [],
	 data: [],
      }
    }
  },//data end

  methods:
  {
     handleAdd()
     {

     },
     
     changeReortType()
     {
        if(this.isAdj==true) this.reportType='5';
	else this.reportType='2';
     }

  }//methods end 
}

 $(".el-input__suffix").removeCl
</script>

<style>
 .el-table__body-wrapper {overflow:auto !important;}
 .el-tabs__header {margin: 0 0 0 0px !important}

 .table-bar
 {
   cursor:pointer;
 }

 .table-bar::-webkit-scrollbar-thumb {
      border-radius: 5px;
      -webkit-box-shadow: #d9d9d9;
      background: rgba(0,0,0,0.2);
      scrollbar-arrow-color:red;
 }
 .table-bar::-webkit-scrollbar-track {
      -webkit-box-shadow: #d9d9d9;
      border-radius: 0;
      background: rgba(0,0,0,0.1);
 }

 .table-bar::-webkit-scrollbar
 {
   width:6px;
   height:6px;
 }

 .el-tabs__item
 {
   padding-left:6px;
   padding-top:0px;
   padding-right:8px;
   padding-bottom:0px;
   font-weight:400;
 }
 .el-header
 {
   padding-left:6px;
   padding-top:0px;
   padding-right:0px;
   padding-bottom:0px;
   height:78px !important;
 }
 .el-select .el-input__inner
 {
    height:32px;
    line-height:32px;
    padding: 4px;
    vertical-align: middle;
 }
 .el-checkbox__label
 {
    padding-left:4px;
 }
 #tab-editTab{padding-left:6px;}
</style>