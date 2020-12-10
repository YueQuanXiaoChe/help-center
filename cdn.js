const packageJson = require("./package.json");

const getVersion = param => {
  return packageJson.dependencies[param].split("^")[1];
};

const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios",
  "vuex-persistedstate": "createPersistedState",
  "sockjs-client": "SockJS",
  'stompjs': 'Stomp'
};

const config_default = {
  css: [],
  js: []
};

const config_development = {
  css: [
    "https://at.alicdn.com/t/font_1700262_4p69bg9gl8k.css"
  ],
  js: [
    'https://at.alicdn.com/t/font_1700262_4p69bg9gl8k.js'
  ]
};

const config_production_preload = {
  css: [
    'https://at.alicdn.com/t/font_1700262_4p69bg9gl8k.css'
  ],
  js: [
    'https://at.alicdn.com/t/font_1700262_4p69bg9gl8k.js',
    `https://cdn.jsdelivr.net/npm/vue@${getVersion('vue')}/dist/vue.min.js`,
    `https://cdn.jsdelivr.net/npm/vuex@${getVersion('vuex')}/dist/vuex.min.js`,
    `https://cdn.jsdelivr.net/npm/vue-router@${getVersion('vue-router')}/dist/vue-router.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${getVersion('axios')}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/vuex-persistedstate@${getVersion('vuex-persistedstate')}/dist/vuex-persistedstate.umd.js`
  ]
};

const config_production_prefetch = {
  css: [],
  js: [
    `https://cdn.jsdelivr.net/npm/sockjs-client@${getVersion('sockjs-client')}/dist/sockjs.min.js`,
    `https://cdn.jsdelivr.net/npm/stompjs@${getVersion('stompjs')}/lib/stomp.js`
  ]
};

exports = module.exports = {
  cdn: {
    externals,
    config_default,
    config_development,
    config_production_preload,
    config_production_prefetch
  }
};
