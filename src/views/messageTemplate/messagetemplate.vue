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
                   v-if="permission.messagetemplate_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="{row,index}" slot="menu">
          <el-button type="text" @click="send(row,index)">发送测试</el-button>
       </template>
    </avue-crud>

      <el-dialog
        title="测试"
        :visible.sync="centerDialogVisible"
        width="50%"
        :close-on-click-modal="false"
        >
        <el-form ref="form2" :model="form2"  label-width="100px" label-position='right' :rules="rules">
          <el-form-item label="模板标题" >
              <el-input placeholder='标题' disabled v-model.trim='form2.title'></el-input>
          </el-form-item>
          <el-form-item label="模板内容">
              <el-input placeholder='内容' disabled v-model.trim='form2.content'></el-input>
          </el-form-item>
          <el-form-item label="模板类型" prop='types'>
            <el-select clearable v-model.trim="form2.types">
              <el-option v-for="(item,key) in state" :key='key' :label="item.types" :value='item.id'></el-option>
            </el-select>
           </el-form-item>
          <el-form-item label="消息接收人" prop='receiver'>
              <el-input v-model.trim="form2.receiver" maxlength='20'></el-input>
          </el-form-item>
          <el-form-item label="测试数据" prop='jsonData'>
              <el-input type="textarea" maxlength='200' :autosize="{ minRows:10, maxRows: 4}"  v-model.trim="form2.jsonData"  placeholder="请输入json格式测试数据"></el-input>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button type="primary" @click="test()" >发送</el-button>
          <el-button @click="centerDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,send} from "@/api/messageTemplate/messagetemplate";
  import {mapGetters} from "vuex";
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
           if (value.trim() == '') {
             callback(new Error('内容不能为空'));
           }else{
             callback();
           }
         };
      return {
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
          menuWidth:380,
          align:'center',//对齐方式
          calcHeight: 350,
          dialogWidth: 320,
          dialogHeight: 500,
          tip: false,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          cancelBtnTitle:'关闭',
          column: [
            {
              label: "模板编号",
              prop: "templateNo",
              editDisplay: true,
              span:24,
              rules: [{
                required: true,
                validator:validatePass,
                trigger: "blur"
              }]
            },
            {
              label: "模板标题",
              prop: "title",
              align:'center',
              span:24,
              rules: [{
                required: true,
                validator: validatePass,
                trigger: "blur"
              }]
            },
            {
              label: "模板类型",
              type: "checkbox",
              span: 24,
              width: 100,
              prop: "typeList",
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
              label: "模板内容",
              prop: "content",
              type: "textarea",
              span: 24,//表格长度
              minRows: 7,//表格高度
              maxlength:200,//限制个数
              showWordLimit:true,//个数提示
              rules: [{
                required: true,
                 validator: validatePass,
                trigger: "blur"
              }]
            },
          ]
        },
        data: [],
        form2:{
           templateNo:'',//模板编号
           types: [],
           title:'',//模板标题
           content:'',//模板内容
           receiver:'',//接收人
           jsonData:''//测试数据

        },
        centerDialogVisible: false,
        state:[
          {'id':'1',"types":'短信'},
          {'id':'2',"types":'邮件'},
          {'id':'3',"types":'推送'},
          {'id':'4',"types":'微信'},
        ],
        rules:{//校验
          types: [
            { validator: validatePass, trigger: 'blur'},
          ],
          receiver: [
            { validator: validatePass, trigger: 'blur'},
          ],
          jsonData: [
            { validator: validatePass, trigger: 'blur'},
          ],
        },
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.messagetemplate_add, false),
          viewBtn: this.vaildData(this.permission.messagetemplate_view, false),
          delBtn: this.vaildData(this.permission.messagetemplate_delete, false),
          editBtn: this.vaildData(this.permission.messagetemplate_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      //发送
      test() {
        this.$refs['form2'].validate((valid) => {
          if (valid) {
             this.centerDialogVisible = false;
             const row = this.form2;
             send(row).then(() => {
               this.$message({
                 type: "success",
                 message: "操作成功!"
               });
             },error => {
               console.log(error);
             })
          }
        });
      },
      //发送测试
      send(row){
        this.centerDialogVisible = true;
        this.form2.templateNo = row.templateNo;
        this.form2.content = row.content;
        this.form2.title = row.title;
      },
      rowSave(row, loading, done) {
        row.types = row.typeList.join(',')
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
          }).catch(() => {});
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
        }).catch(() => { this.loading = false; });
      }
    }
  };
</script>

<style scoped="scoped">
  .el-input,.el-textarea,.el-select{
    width: 93%;
  }
  .el-dialog .el-dialog__body{
    text-align: center;
  }
  /deep/.el-dialog__headerbtn{
    display: none;
  }
/*  .el-checkbox-group{
    display: inline-block;
    margin-right: 0.625rem;
  } */
</style>
