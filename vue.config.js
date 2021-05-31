const loader = require("sass-loader")

module.exports = {
  productionSourceMap: false, //不生成sourcemap
  css: {
    extract: false // 将css合并到js
  },
  chainWebpack: config => {
    // 配置图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  }
}