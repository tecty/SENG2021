var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('../backend/static/bundles/prod/')

config.plugins = config.plugins.concat([
  new BundleTracker({filename: 'webpack/webpack-stats-prod.json'}),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'BASE_API_URL': JSON.stringify('https://example.com/api/v1/'),
  }}),

  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
])

module.exports = config