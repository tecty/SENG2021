var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var config = require('./webpack.base.config.js')
var ip = 'localhost'

config.devtool = "#eval-source-map"

config.entry = {
  App: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    '../src/index.js',
  ],
}

config.output.publicPath = 'http://' + ip + ':3000' + '/assets/bundles/'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new BundleTracker({filename: 'webpack/webpack-stats-local.json'}),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
      'BASE_API_URL': JSON.stringify('https://'+ ip +':8000/api/v1/'),
  }}),
])

module.exports = config