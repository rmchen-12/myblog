const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new ExtractTextPlugin({
      filename: "bundle.[contenthash].css",
      disable: false,
      allChunks: true
    }),
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false,
          drop_console: true,
          pure_funcs: ["console.log"]
        },
        compress: {
          warnings: false
        }
      }
    }),
    new BundleAnalyzerPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: "production" })
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
});
