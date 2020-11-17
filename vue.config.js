// const path = require("path");
// 版本号
process.env.VUE_APP_VERSION = require("./package.json").version;
// 是否生产环境
const IS_PROD = process.env.NODE_ENV === "production";
// // compression-webpack-plugin 插件
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// const CompressionWebpackPlugin = require("compression-webpack-plugin");
// // uglifyjs-webpack-plugin 插件
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  /**
   * Default: '/'
   * 部署应用包时的基本 URL， 用法和 webpack 本身的 output.publicPath 一致。
   * 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
   */
  publicPath: "/",
  
  /**
   * Default: 'dist'
   * 输出文件目录，当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
   */
  outputDir: "dist",

  /**
   * Default: ''
   * 放置生成的静态资源 (js、css、img、fonts) 的目录。
   */
  assetsDir: ".",

  /**
   * Default: 'index.html'
   * 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
   */
  indexPath: "index.html",

  /**
   * Default: true
   * 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
   */
  filenameHashing: true,

  /**
   * Default: undefined
   * 在 multi-page（多页）模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。
   */
  // pages: undefined,

  /**
   * Default: true
   * 是否在保存的时候使用 `eslint-loader` 进行检查。 有效的值：`ture` | `false` | `"error"`  当设置为 `"error"` 时，检查出的错误会触发编译失败
   */
  lintOnSave: true,

  /**
   * Default: false
   * 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
   */
  runtimeCompiler: true,

  /**
   * Default: []
   * 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
   */
  // transpileDependencies: [],

  /**
   * Default: true
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   */
  productionSourceMap: false,

  /**
   * Default: undefined
   * 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
   */
  // crossorigin: undefined,

  /**
   * Default: false
   * 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
   */
  // integrity: false,

  /**
   * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   * 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   */
  configureWebpack: config => {
    // 生产环境
    if (IS_PROD) {
      //
    }
  },

  /**
   * 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
   */
  chainWebpack: config => {
    //
  },

  // css: {
  //   //
  // },

  /**
   * 所有 webpack-dev-server 的选项都支持。注意：
   * 有些值像 host、port 和 https 可能会被命令行参数覆写。
   * 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
   */
  devServer: {
    open: false, // 项目启动时自动打开浏览器
    host: "0.0.0.0",
    port: 8080, // 端口
    https: false, // 是否启用 http 协议
    // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
    proxy: {
      "/proxy": {
        target: process.env.VUE_APP_API, // "http://192.168.12.201:40003", //代理地址，这里设置的地址会代替axios中设置的baseURL
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: { "^/proxy": "lb/api" }
      }
    }
  },

  /**
   * Default: require('os').cpus().length > 1
   * 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
   */
  parallel: require("os").cpus().length > 1

  /**
   * 向 PWA 插件传递选项。
   */
  // pwa: {},

  /**
   * 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
   */
  // pluginOptions: {
  //   dockerNginxProxy: {
  //     // eslint-disable-next-line @typescript-eslint/camelcase
  //     proxy_prefix: "/proxy",
  //     // eslint-disable-next-line @typescript-eslint/camelcase
  //     env_prefix: {
  //       dev: require("dotenv").config({
  //         path: ".env.dev"
  //       }).parsed.VUE_APP_API,
  //       qa: require("dotenv").config({
  //         path: ".env.qa"
  //       }).parsed.VUE_APP_API,
  //       pro: require("dotenv").config({
  //         path: ".env.pro"
  //       }).parsed.VUE_APP_API,
  //       pre: require("dotenv").config({
  //         path: ".env.pre"
  //       }).parsed.VUE_APP_API,
  //       stress: require("dotenv").config({
  //         path: ".env.stress"
  //       }).parsed.VUE_APP_API
  //     }
  //   },
  //   dll: {
  //     // 入口配置
  //     // entry: ['vue', 'vue-router', 'axios', 'vuex'],
  //     entry: {
  //       vue: ["vue"],
  //       vueRouter: ["vue-router"],
  //       vuex: ["vuex"],
  //       vuexClass: ["vuex-class"],
  //       vuexPersistedstate: ["vuex-persistedstate"],
  //       axios: ["axios"],
  //       vuedraggable: ["vuedraggable"],
  //       interactjs: ["interactjs"],
  //       moment: ["moment"],
  //       elementResizeDetector: ["element-resize-detector"],
  //       // nodeUuid: ['node-uuid'],
  //       coreJs: ["core-js"]
  //     },
  //     // 输出目录
  //     output: path.join(__dirname, "./public/dll"),
  //     // 是否开启 DllReferencePlugin,
  //     // 默认情况下，插件没有检测到 vendor (执行 `npm run dll` 指令生成的 chunk 包)，会自动关闭。
  //     // 在有需要的情况下可以手动关闭插件，例如：
  //     // 1. 为了在开发环境使用vue代码中的提示，可配置只在生产环境开启分包模式，`open : process.env.NODE_ENV === 'production'`。
  //     // 2. 在构建目标(`target`)为 `node`，需要手动关闭 dll 插件。
  //     open: IS_PROD,
  //     // 自动注入到 index.html
  //     // 在执行 `dev` , `build` 等其他指令时，程序会自动将 `dll` 指令生成的 `*.dll.js` 等文件自动注入到 index.html 中。
  //     inject: true
  //   }
  // }
};
