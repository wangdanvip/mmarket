var _ =require("lodash");

var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var glob = require('glob');
var env = process.env.NODE_ENV;
var configPath = config[env];

var entries = utils.getEntry(['./src/module/*.js', './src/module/**/*.js']); // 获得入口js文件


console.log(
  `
    .##.....##..........########..........########.
    .###...###.............##.............##.....##
    .####.####.............##.............##.....##
    .##.###.##.............##.............########.
    .##.....##.............##.............##.......
    .##.....##.............##.............##.......
    .##.....##.............##.............##.......

    正在拼命压缩打包...
  `
);

// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'dev' && configPath.cssSourceMap)
var cssSourceMapProd = (env !== 'dev' && configPath.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: entries,
  output: {
    path: config.prod.assetsRoot,
    publicPath: process.env.NODE_ENV !== 'dev' ? configPath.assetsPublicPath : configPath.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'common': path.resolve(__dirname, '../src/common'),
      'components': path.resolve(__dirname, '../src/components'),
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: useCssSourceMap
    }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}

