const IS_PROD = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "/"
};
