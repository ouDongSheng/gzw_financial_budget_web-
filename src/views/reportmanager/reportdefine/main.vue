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

<!-- 在 <template> 上使用特殊的 slot attribute，可以将内容从父级传给具名插槽  -->
/** type = primary / success / warning / danger / info / text */
/** size = medium / small / mini */
/** plain 加plain 颜色变浅，plain是否鼠标滑过/点击背景变深色调  */


      <template slot="menuLeft">
        <el-button type="warning" 
                   size="small" 
                   icon="el-icon-delete"
                   plain
                   v-if="permission.reportitem_add"
                   @click="handleDelete">删 除
        </el-button>
      </template>

      <template slot="serviceLogo" slot-scope="scope" >
          <img class="logo" :src="scope.row.serviceLogo" />
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {
    getList,
    getDetail,
    add,
    update,
    remove
  } from "@/api/reportmanager/reportitem";
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {

        form: {},
        query: {},
        loading: true,
        messageType: 1,//传给后台状态
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          calcHeight: 350,
          tip: false,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          labelWidth: 130,//弹出表格宽度
          dialogHeight:550,//弹出表格高度
          align:'center',
          addBtn:true,
          editBtn:false,
          cancelBtnTitle:'关闭',
          column: [{
              label: "服务商名称",
              prop: "serviceName",
              rules: [{
                required: true,
                message: "请输入服务商名称",
                trigger: "blur"
              }]
            },
            {
              label: 'LOGO',
              type: 'upload',
              listType: 'picture-img',
              span: 12,
              row: true,
              prop: 'serviceLogo',
              slot:true,//开启插槽
              action: '/api/blade-resource/oss/endpoint/put-file',//上传图片api
              tip: '只能上传jpg/png用户头像，且不超过500kb',
              propsHttp: {
                res: 'data',
                url: 'link',
              },
              canvasOption: {
                text: 'bladex',
                ratio: 0.1
              },
              rules: [{
                required: true,
                message: "请上传商品LOGO",
                trigger: "blur"
              }]
            },
            {
              label: "消息ID",
              prop: "messageId",
              rules: [{
                required: true,
                message: "请输入消息ID",
                trigger: "blur"
              }]
            },
            {
              label: "发送人",
              prop: "sender",
              rules: [{
                required: true,
                message: "请输入发送人",
                trigger: "blur"
              }]
            },
            {
              label: "接收人",
              prop: "receiver",
              rules: [{
                required: true,
                message: "请输入接收人",
                trigger: "blur"
              }]
            },
            {
              label: "标题",
              prop: "title",
              rules: [{
                required: true,
                message: "请输入发送标题",
                trigger: "blur"
              }]
            },
            {
              label: "发送内容",
              prop: "content",
              rules: [{
                required: true,
                message: "请输入发送内容",
                trigger: "blur"
              }]
            },
            {
              label: "发送时间",
              prop: "sendTime",
              type: "datetime",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
              hide: true
            },
            {
              label: "发送状态",
              prop: "sendStatus",
              type: "select",
              dicData: [{
                  label: "成功",
                  value: 0
                },
                {
                  label: "失败",
                  value: 1
                }
              ],
              rules: [{
                required: true,
                message: "请输入发送状态",
                trigger: "blur"
              }]
            },
          ]
        },
        data: [],//显示页面数据,

      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.message_email_add, false),
          viewBtn: this.vaildData(this.permission.message_email_view, false),
          delBtn: this.vaildData(this.permission.message_email_delete, false),
          editBtn: this.vaildData(this.permission.message_email_edit, false)
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
      rowSave(row, loading, done) {//新增
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
      rowUpdate(row, index, loading, done) {//编辑
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
      rowDel(row) {//删除
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
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {//页面刚加载时
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query),this.messageType).then(res => {
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

<style lang="scss">
  @import "@/styles/message.scss";
</style>
