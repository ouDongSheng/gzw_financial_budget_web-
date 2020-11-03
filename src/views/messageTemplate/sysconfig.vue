<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.message_template_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot="serviceLogo" slot-scope="scope" >
          <img class="logo" :src="scope.row.serviceLogo" />
      </template>
      <template slot-scope="{row}"
                slot="category">
        <el-tag>{{row.categoryName}}</el-tag>
      </template>
      <template slot="configDataItemListForm" slot-scope="scope">
         <avue-crud :option="infoOption"
                    :data="infoData"
                    @row-save="rowSave2"
                    @row-del="rowDel2"
                    @row-update="rowUpdate">
            <template slot-scope="{row,index}" slot="key">
               <el-input
                 maxlength= '20'
                 placeholder="请输入内容"
                 v-model.trim="row.key"
                 clearable>
               </el-input>
            </template>
            <template slot-scope="{row,index}" slot="value">
               <el-input
                 maxlength= '20'
                 placeholder="请输入内容"
                 v-model.trim ="row.value"
                 clearable>
               </el-input>
            </template>
            <template slot-scope="{row,index}" slot="sort">
               <el-input
                 maxlength= '3'
                 placeholder="请输入内容"
                 v-model.trim="row.sort"
                 clearable>
               </el-input>
            </template>
            <template slot-scope="{row,index}" slot="desc">
               <el-input
                 maxlength= '20'
                 placeholder="请输入内容"
                 v-model.trim="row.desc"
                 clearable>
               </el-input>
            </template>
         </avue-crud>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/messageTemplate/sysconfig";
  import {mapGetters} from "vuex";

  export default {
    data() {
     var validatePass2 = (rule, value, callback) => {
          if (value.trim() === '') {
            callback(new Error('不能为空'));
          } else {
            callback();
          }
        };
    var validatePass3 = (rule, value, callback) => {
         if (value.trim() === '') {
           callback(new Error('不能为空'));
         } else {
           callback();
         }
       };
      return {
        data: [],
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          dialogHeight:550,//弹出表格高度
          align:'center',//对齐方式
          calcHeight: 350,
          tip: false,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          cancelBtnTitle:'关闭',
          column: [
            {
              label: "服务商",
              prop: "serviceName",
              maxlength:10,
              rules: [{required: true,validator: validatePass3, trigger: 'blur' }]
            },
            {
              label: "状态",
              type: "select",
              span: 12,
              prop: "status",
              dicUrl: "/api/blade-system/dict/dictionary?code=state",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请选择状态",
                trigger: "blur"
              }]
            },
            {
              label: "模板类型",
              type: "select",
              span: 12,
              // width: 100,
              prop: "configType",
              dicUrl: "/api/blade-system/dict/dictionary?code=template_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请选择模板类型 短信 邮件 推送 微信",
                trigger: "blur"
              }]
            },
            {
              label: "排序",
              prop: "sort",
              type: "number",
              minRows: 0,//最小值
              maxRows: 999,//最大值
              rules: [{
                required: true,
                message: "请输入菜单排序",
                trigger: "blur"
              }]
            },
            {
              label: 'LOGO',
              type: 'upload',
              listType: 'picture-img',
              span: 12,
              prop: 'serviceLogo',
              slot:true,//开启插槽
              action: '/api/blade-resource/oss/endpoint/put-file',//上传图片api
              tip: '只能上传jpg/png用户头像，且不超过500kb',
              propsHttp: {
                res: 'data',
                url: 'link',
              },
              rules: [{
                required: true,
                message: "请上传商品LOGO",
                trigger: "blur"
              }]
            },
            {
              label: "说明",
              prop: "remark",
              type: "textarea",
              row: true,
              span: 24,//表格长度
              minRows: 7,//表格高度
              maxlength:200,//限制个数
              showWordLimit:true,//个数提示
              rules: [{required: true,validator: validatePass2, trigger: 'blur' }]
            },
            {
              label: "参数配置",
              prop: "configDataItemList",
              span:24,
              formslot:true,
              hide:true,
              // viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入参数配置JSON",
                trigger: "blur"
              }]
            }
          ]
        },
        infoOption:{
          editBtn:false,
           column: [{
             label: '名称',
             prop: 'key',
             slot:true,
             maxlength:20,
             rules: [{
               required: true,
               validator: validatePass2,
               trigger: "blur"
             }]
           },
           {
             label: '参数默认值',
             prop: 'value',
             slot:true,
             maxlength:20,
             rules: [{
               required: true,
               validator: validatePass2,
               trigger: "blur"
             }]
           },
           {
            label: "排序",
            prop: "sort",
            type: "number",
            slot:true,
            minRows: 0,//最小值
            maxRows: 999,//最大值
            rules: [
                {
                  required: true,
                  message: "请输入菜单排序",
                  trigger: "blur"
                }
              ]
            },
           {
             label: '参数描述',
             prop: 'desc',
             maxlength:20,
             slot:true,
             rules: [{
               required: true,
               validator: validatePass2,
               trigger: "blur"
             }]
           }]
        },
        data2:[],
        add:[],//新增
        flge:false,
        sign:0,
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.message_template_add, false),
          viewBtn: this.vaildData(this.permission.message_template_view, false),
          delBtn: this.vaildData(this.permission.message_template_delete, false),
          editBtn: this.vaildData(this.permission.message_template_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      },
      //弹出框表格显示数据
      infoData(){
        return this.form.configDataItemList || this.form.configData
      }
    },
    mounted() {
       window.addEventListener('scroll', this.handleScroll, true);// 监听（绑定）滚轮滚动事件
    },
    methods: {
      handleScroll() {
         let clientHeight = this.option.dialogHeight; //屏幕高度
         // let scrollTop = this.$refs.crud.$refs.dialogForm.$refs.content.scrollTop;// 到头部的距离
         // console.log(this.$refs.crud.$refs.table.$refs.bodyWrapper)
         let scrollObj = document.getElementsByClassName('el-dialog__body')[0].children[0];
         // console.log(scrollObj)
         let scrollTop = scrollObj.scrollTop;
         console.log(scrollTop)
      },

      rowSave(row, loading, done) {
        // const configDataItemList = JSON.stringify(this.form.configDataItemList);
        // row.configDataItemList = row.configDataItemList==''?null:row.configDataItemList;
        row.remark = row.remark.trim()
        let flag = false;
        let flagMassge = [];
        let flagNumber = false;
        let flagDesc = false;
        row.configDataItemList.map((item, indexs) => {
          if(item.key.trim() === '' || item.value === '' || item.desc === ''){
            flag = true;
            flagMassge.push(indexs)
            return false;
          }else if(!/^[0-9]*$/.test(item.sort)){
            flagNumber = true;
            return false;
          }
        })
        if(flag){
          done();
          return this.$message.error('请把参数配置列表第'+(flagMassge[0]+ 1)+'行填写完整');
        }
        if(flagNumber){
          done();
          return this.$message.error('请输入大于或等于零的整数');
        }
        if(flagDesc){
          done();
          return this.$message.error('不能有特殊符号,不能为空');
        }
        add(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowUpdate(row, index, loading, done) {
          // console.log(this.$refs.crud.$refs.dialogForm.$refs.content.scrollTop)
        // const configDataItemList = JSON.stringify(this.form.configDataItemList);
        row.remark = row.remark.trim()
        let flag = false;
        let flagMassge = [];
        let flagNumber = false;
        let flagDesc = false;
        row.configDataItemList.map((item, indexs) => {
          if(item.key.trim() === '' || item.value === '' || item.desc === ''){
            flag = true;
            flagMassge.push(indexs)
            return false;
          }else if(!/^[0-9]*$/.test(item.sort)){
            flagNumber = true;
            return false;
          }
        })
        if(flag){
          done();
          return this.$message.error('请把参数配置列表第'+(flagMassge[0]+ 1)+'行填写完整');
        }
        if(flagNumber){
          done();
          return this.$message.error('请输入大于或等于零的整数');
        }
        if(flagDesc){
          done();
          return this.$message.error('不能有特殊符号,不能为空');
        }
        update(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      //新增
      rowSave2(row, loading) {
        if(this.form.configDataItemList instanceof Array  == false){
              this.form.configDataItemList = [];
              this.form.configDataItemList.push(row);
              loading();
          }else{
            this.form.configDataItemList.push(row);
            loading();

        }
      },
      //删除
      rowDel2(row,index) {
        this.form.configDataItemList.splice(index,1);
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          }).catch(() => {});;
        }
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params) {
        this.query = params;
        this.onLoad(this.page, params);
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
          console.log(this.data)
        }).catch(() => { this.loading = false; });
      },
   }
  };
</script>

<style lang="scss">
  @import "@/styles/message.scss";
</style>
