process.env.VUE_APP_VERSION = require("./package.json").version;
const IS_PROD = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: ".",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: config => {
    // 生产环境
    if (IS_PROD) {
      //
    }
  }
};
