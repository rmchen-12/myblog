const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf.js");
const webpack = require("webpack");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const config = require("./index");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./build",
    port: config.port,
    hot: true,
    inline: true
    // quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: `http://${config.host}:${config.port}`
    })
  ]
});
