<template>
  <div id="app" pro='a'>
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: "app",
  provide() {
    // 注册一个方法
    // vue提供了provide和inject帮助我们解决多层次嵌套嵌套通信问题。在provide中指定要传递给子孙组件的数据，子孙组件通过inject注入祖父组件传递过来的数据。
    // 父组件中返回要传给下级的数据
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  watch: {},
  created() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  computed: {}
};

</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.avue-left
{
  width:200px
}
</style>
