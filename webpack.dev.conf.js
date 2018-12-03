const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./build",
    port: 3000
  }
});
