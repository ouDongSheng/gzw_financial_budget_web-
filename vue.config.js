const webpack = require("webpack");

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "components": "@/components",
        "views": "@/views"
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      }),
    ]
  },
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      "vue": "Vue",
      "vue-router": "VueRouter",
      "vuex": "Vuex",
      "axios": "axios",
      "element-ui": "ELEMENT",
    });
    const entry = config.entry("app");
    entry
      .add("babel-polyfill")
      .end();
    entry
      .add("classlist-polyfill")
      .end();
    entry
      .add("@/mock")
      .end();
  },
  devServer: {
    port: 1888,
    proxy: {
      "/api": {
        // 本地服务接口地址
        target:'http://localhost:8080/',
        // target: "http://192.9.102.130:30037/",//服务器
        ws: true,
        pathRewrite: {
          "^/api": "/"
        }
      },
    }
  },
};
