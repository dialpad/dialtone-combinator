const path = require('path');

module.exports = {
  publicPath: '././',
  lintOnSave: false,
  css: {
    extract: false,
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-browser.js',
        '@': path.join(__dirname, '.'),
      },
    },
  },
};
