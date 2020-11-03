<template>
<el-container>
  <el-aside width="260px">
    <ep-tree ></ep-tree>
  </el-aside>
  <el-main>
    <div style='padding-top:6px;margin-left:0px;padding-left:0px;height:99%;width:99%;background:#fafbfc;align:right'>
      <template>
        <el-container>
	   <el-header>
	      <table style='width:100%'>
	        <tr>
		  <td>
		    <table style='width:100%'>
		      <tr>
		        <td><unite-button ></unite-button></td>
			<td></td>
		      </tr>
		    </table>
		   </td>
		</tr>
	        <tr>
		  <td><edit-button ></edit-button></td>
		</tr>
	      </table>
	   </el-header>
           <el-main>
             <div style='width:100%;align:center;padding-top:6px'>
               <lb-table :column="tableData.column"
               :data="tableData.data"
               id='dateTable'
               height="436"
               border>
               </lb-table>
             </div>
	
              <div style='width:100%;align:center;padding-top:0px;margin-left:0px;background:menu'>
	      <table style='width:100%;'>
	         <tr>
		   <td width='140px'>
		   <div class='table-bar' style='height:30px;width:100%;margin-top:0px;margin-top:0px;margin-bottom:11px;overflow-x:no;overflow-y:no;'>
		   <table style='width:100%;'>
		    <tr>
		   <td width='32px' height='30px' align='center'>
		      <button type="button" class="el-button el-button--info is-plain" style='padding:1px;width:28px;height:28px;background:#edf0f5;vertical-align:bottom'>
		       <img height='24px' width='21px' src='../../../../assets/commonIcons/detail.png'/>
		       </button>
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
		     <div class='table-bar' style='height:36px;width:700px;margin-top:0px;margin-bottom:4px;overflow-x:auto;overflow-y:no;'>
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

     }
  }//methods end 
}
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

</style>