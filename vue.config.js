const path = require('path');
module.exports = {
  lintOnSave: false,
  css: { extract: false },
  chainWebpack: config => {
    config.externals({ '@dialpad/dialtone': '@dialpad/dialtone' });
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-browser.js',
        '@': path.join(__dirname, '.'),
      },
    },
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
};
