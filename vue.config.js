// path 是 node 中的一个核心模块，用于处理文件和目录的路径
const path = require("path");
// 版本号
process.env.VUE_APP_VERSION = require("./package.json").version;
// 是否生产环境
const IS_PROD = process.env.NODE_ENV === "production";
// 测量各个插件和loader所花费的时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// 配置 hard-source-webpack-plugin，首次构建时间没有太大变化，但是第二次开始，构建时间大约可以节约 80%。
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// compression-webpack-plugin 插件
const CompressionPlugin = require("compression-webpack-plugin");
// uglifyjs-webpack-plugin 插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 是否启用 https 协议
const IS_HTTPS = false;
// cdn && dll 相关配置
const { externals, cdn } = require("./cdn&&dll.js");

// 官方配置文档 ----> https://cli.vuejs.org/zh/config/#baseurl
module.exports = {
  /**
   * Type: string
   * Default: '/'
   * 部署应用包时的基本 URL。
   * 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
   */
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "/",

  /**
   * Type: string
   * Default: 'dist'
   * 输出文件目录，当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
   */
  outputDir: "dist",

  /**
   * Type: string
   * Default: ''
   * 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
   */
  assetsDir: "",

  /**
   * Type: string
   * Default: 'index.html'
   * 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
   */
  indexPath: "index.html",

  /**
   * Type: boolean
   * Default: true
   * 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
   */
  filenameHashing: true,

  /**
   * Type: Object
   * Default: undefined
   * 在 multi-page（多页）模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。
   * 其值应该是一个对象，对象的 key 是入口的名字，value 是：
   * 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
   * 或一个指定其 entry 的字符串。
   */
  // pages: {
  //   index: {
  //     // page 的入口文件
  //     entry: path.resolve(__dirname, "./src/main.js"), // 将路径解析为绝对路径
  //     // 模板来源
  //     template: "public/index.html",
  //     // 在 dist/index.html 的输出文件
  //     filename: "index.html",
  //     // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: "帮助中心",
  //     // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   // 当使用只有入口的字符串格式时，
  //   // 模板会被推导为 `public/subpage.html`
  //   // 并且如果找不到的话，就回退到 `public/index.html`。
  //   // 输出文件名会被推导为 `subpage.html`。
  //   subpage: 'src/subpage/main.js'
  // },

  /**
   * Type: boolean | 'warning' | 'default' | 'error'
   * Default: 'default'
   * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。
   * 当 lintOnSave 是一个 truthy 的值时，eslint-loader 在开发和生产构建下都会被启用。
   */
  lintOnSave: !IS_PROD,

  /**
   * Type: boolean
   * Default: false
   * 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
   */
  runtimeCompiler: true,

  /**
   * Type: Array<string | RegExp>
   * Default: []
   * 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
   */
  // transpileDependencies: [],

  /**
   * Type: boolean
   * Default: true
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   */
  productionSourceMap: false,

  /**
   * Type: string
   * Default: undefined
   * 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
   * 该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
   */
  // crossorigin: undefined,

  /**
   * Type: boolean
   * Default: false
   * 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
   * 该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
   */
  // integrity: false,

  /**
   * Type: Object | Function
   * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   * 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   */
  configureWebpack: config => {
    // 生产环境
    if (IS_PROD) {
      // 开启 gzip 压缩
      config.plugins.push(
        new CompressionPlugin({
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 测试匹配文件
          // include: /\/includes/, // 要包含的文件
          // exclude: /\/excludes/, // 要排除的文件
          algorithm: "gzip", // 压缩算法
          compressionOptions: { level: 1 }, // 压缩选项
          threshold: 10240, // 仅处理大于此大小的资源，按字节计算
          // minRatio: 0.8, // 仅压缩比该比率更好的资源
          // minRatio: Infinity, // 压缩所有资源，包括字节大小为 0 的文件
          minRatio: Number.MAX_SAFE_INTEGER, // 压缩所有资源，不包括字节大小为 0 的文件
          filename: "[path][base].gz", // 目标资源文件名
          deleteOriginalAssets: false, // 是否删除原始资源
          cache: true // 启用/禁用文件缓存，缓存默认路径: node_modules/.cache/compression-webpack-plugin
        })
      );
      // 打包时自动删除 debugger / console
      config.optimization.minimizer.push(
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i, // 测试匹配文件
          // include: /\/includes/, // 要包含的文件
          // exclude: /\/excludes/, // 要排除的文件
          chunkFilter: () => true, // 允许过滤哪些块应该被丑化（默认情况下所有块都被丑化）
          cache: false, // 是否启用文件缓存，缓存目录的默认路径 node_modules/.cache/uglifyjs-webpack-plugin
          // cacheKeys: defaultCacheKeys => defaultCacheKeys, // 允许覆盖默认的缓存键
          parallel: true, // 是否使用多进程并行运行来提高构建速度
          sourceMap: false,
          // minify: undefined,
          extractComments: false, // 启用/禁用提取注释
          // warningsFilter: () => true,
          // 压缩选项
          uglifyOptions: {
            compress: {
              drop_debugger: true, // 生产环境自动删除 debugger
              drop_console: true // 生产环境自动删除 console
            }
          }
        })
      );
      config = smp.wrap(config);
    } else {
      config.plugins.push(new HardSourceWebpackPlugin());
    }
  },

  /**
   * Type: Function
   * 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
   */
  chainWebpack: config => {
    // 去除默认预加载
    // prefetch: 用于标记浏览器在页面加载完成后，利用空闲时间预加载的内容。Vue CLI 应用默认为所有作为 async chunk 生成的 javascript 文件 (通过动态 import() 按需 code splitting 的产物) 自动生成 prefetch 提示
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");

    // preload: 用于标记页面加载后即将用到的资源，浏览器将在主体渲染前加载 preload 标记文件。Vue CLI 应用会为所有初始化渲染需要的文件自动生成 preload 提示
    // 移除 preload 插件
    config.plugins.delete("preload");

    // 配置别名
    config.resolve.alias
      .set("@views", path.resolve(__dirname, "./src/views"))
      .set("@comp", path.resolve(__dirname, "./src/components"));

    if (IS_PROD) {
      // 忽略生成环境打包的文件
      config.externals(externals);
      // 在 index.html 页面启用 cdn
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },

  css: {
    /**
     * Type: boolean
     * Default: true
     * 启用 CSS modules for all css / pre-processor files.
     */
    requireModuleExtension: true,

    /**
     * Type: boolean | Object
     * Default: 生产环境下是 true，开发环境下是 false
     * 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
     * 当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS。
     * 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
     */
    extract: IS_PROD,

    /**
     * Type: boolean
     * Default: false
     * 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
     */
    sourceMap: false,

    /**
     * Type: Object
     * Default: {}
     * 向 CSS 相关的 loader 传递选项。
     */
    loaderOptions: {
      // css: {
      //   // 这里的选项会传递给 css-loader
      // },
      // postcss: {
      //   // 这里的选项会传递给 postcss-loader
      // }
    }
  },

  /**
   * 所有 webpack-dev-server 的选项都支持。注意：
   * 有些值像 host、port 和 https 可能会被命令行参数覆写。
   * 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
   */
  devServer: {
    open: false, // 设置 server 启动后是否自动打开浏览器
    host: "0.0.0.0", // 允许外部ip访问，设定为："0.0.0.0"
    port: 8080, // 指定要监听请求的端口号
    https: IS_HTTPS, // 是否启用 https 协议
    // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
    proxy: {
      "/proxy": {
        target: process.env.VUE_APP_API, // 代理地址，这里设置的地址会代替 axios 中设置的 baseURL
        secure: IS_HTTPS, // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，只要设置 secure: false 就行
        changeOrigin: true, // 如果接口跨域，设置为 true，否则设置为 false
        ws: false, // 是否启用 websockets
        pathRewrite: { "^/proxy": "/" } // 重写 url
      }
    }
  },

  /**
   * Type: boolean
   * Default: require('os').cpus().length > 1
   * 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
   */
  parallel: require("os").cpus().length > 1,

  /**
   * Type: Object
   * 向 PWA 插件传递选项。
   */
  // pwa: {},

  /**
   * 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
   */
  pluginOptions: {
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
  }
};
