const packageJson = require("./package.json");

const getVersion = param => {
  return packageJson.dependencies[param].split("^")[1];
};

const jsdelivr = (key, value) => {
  return `https://cdn.jsdelivr.net/npm/${key}@${getVersion(key)}/${value}`;
};

const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios"
};

const cdnMap = new Map([
  ["vue", "dist/vue.min.js"],
  ["vue-router", "dist/vue-router.min.js"],
  ["vuex", "dist/vuex.min.js"],
  ["axios", "dist/axios.min.js"]
]);

const cdn = {
  css: [],
  js: [
    // // vue
    // "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    // // vue-router
    // "https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js",
    // // vuex
    // "https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js",
    // // axios
    // "https://cdn.jsdelivr.net/npm/axios@0.21.0/dist/axios.min.js"
  ]
};

Object.entries(externals).map(entry => {
  cdn.js.push(jsdelivr(entry[0], cdnMap.get(entry[0])));
});

exports = module.exports = { externals, cdn, dll };
