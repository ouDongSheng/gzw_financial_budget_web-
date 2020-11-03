<template>
  <div class="menu-btn">
     <i class="el-icon-edit" @click="handleEdit"></i>
     <i class="el-icon-tickets" @click="handleView"></i>
     <i class="el-icon-delete" @click="rowDelete"></i>
  </div>
</template>

<script>
  export default {
    props:{
      row:Object
    },
    data() {
      return {}
    },
    methods: {
      rowDelete() {
        this.$parent.$parent.$parent.rowDel(this.row)
      },
      handleEdit() {
        this.$parent.$parent.$parent.rowEdit(this.row)
      },
      handleView() {
       this.$parent.$parent.$parent.rowView(this.row)
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .menu-btn i {
    padding: 0 10px;
    cursor:pointer;
    &:nth-child(1) {color:#686AD3;}
    &:nth-child(2) {color:#99D264;}
    &:nth-child(3) {color:#FF6D6D;}
  }
</style>
