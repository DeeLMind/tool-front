'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

// 路径拼接,__dirname 当前路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

// 获取配置环境
var proxyIp = ''
if (process.env.NODE_ENV === 'lserver') {
  proxyIp = 'http://127.0.0.1:80/'
  // proxyIp = 'https://192.168.199.129:443/'
}

if (process.env.NODE_ENV === 'rserver') {
  proxyIp = 'http://47.107.28.64/v1'
}

// 默认网站Title，标题，如果defaultSetting没有设置，则为極客方舟
const name = defaultSettings.title || '極客方舟'

// 开发时临时端口
const port = 81

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    proxy: proxyIp,
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '#': resolve('src/styles'), // src/styles 样式css路径
        '~': resolve('protco')// protco
      }
    }
  },
  parallel: false,
  chainWebpack: config => {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // .rule('worker')
    // .test(/\.worker\.js$/)
    // .use('worker')
    // .loader('worker-loader')
    // .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
