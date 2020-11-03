<template>
  <div class="basic-container">
    <!--
    将信息聚合在卡片容器中展示。包含标题，内容和操作 
    Card 组件包括header和body部分，header部分需要有显式具名 slot 分发，同时也是可选的。
    -->
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "basicContainer"
};
</script>

<style lang="scss">
.basic-container {
  padding: 10px 6px;
  border-radius: 10px;
  box-sizing: border-box;
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
