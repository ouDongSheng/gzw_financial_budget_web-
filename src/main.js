import Vue from "vue";
import axios from "./router/axios";
import VueAxios from "vue-axios";
import App from "./App";
import router from "./router/router";
import $ from 'jquery';
import "./permission"; // 权限
import "./error"; // 日志
import store from "./store";
import { loadStyle } from "./util/util";
import * as urls from "@/config/env";
import Element from "element-ui";
import {
  iconfontUrl,
  iconfontVersion
} from "@/config/env";
import i18n from "./lang"; // Internationalization
import "./styles/common.scss";
import basicContainer from "./components/basic-container/main";
import "reset-css";//去除默认样式
import xss from 'xss';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import echarts from 'echarts'

window.AVUE = Avue;

Vue.use(router);
//vue-axios是将axios集成到Vue.js的小包装器
//在mian.js中引用axios，vue-axios，通过全局方法 Vue.use() 使用插件，就相当于调用install方法：
Vue.use(VueAxios, axios);
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)////为了实现element插件的多语言切换
});
Vue.use(window.AVUE, {
  i18n: (key, value) => i18n.t(key, value)
});
//注册全局容器
Vue.component("basicContainer", basicContainer);
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
});

Vue.prototype.$ = $; // 当然还有这句话 给vue原型上添加 $
Vue.prototype.$xss = xss;

Vue.prototype.$echarts = echarts;

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace("$key", ele));
});
//Vue.config.productionTip = false; 作用
//没有Vue.config.productionTip = false这句代码，它会显示你生产模式的消息
//开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。
//而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。
//此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  /*
  render: h => h(App)是ES6的写法，其实就是如下内容的简写：render: function (createElement) {return createElement(App);} 
  官方文档中是这样的，createElement 是 Vue.js 里面的 函数，这个函数的作用就是生成一个 VNode节点，render 函数得到这个
  VNode 节点之后，返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name 标签名称
      this.$slots.default // 子组件中的阵列
    )
  }
  然后ES6写法 render: createElement => createElement(App),然后用h代替createElement，使用箭头函数来写：render: h => h(App)
  解释：createElement 函数是用来生成 HTML DOM 元素的，而上文中的 Hyperscript也是用来创建HTML结构的脚本，这样作者才把 createElement 简写成 h。
  而 createElement(也就是h)是vuejs里的一个函数。这个函数的作用就是生成一个 VNode节点，render 函数得到这个 VNode 节点之后，
  返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上。

  */
  render: h => h(App)
}).$mount("#app");
