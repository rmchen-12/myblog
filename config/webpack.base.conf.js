const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpack = require("webpack");

const ROOT_PATH = path.resolve(__dirname, "../");
const ENTRY_PATH = resolvePath("app/index.js");
const OUTPUT_PATH = resolvePath("build");

module.exports = {
  entry: {
    index: [ENTRY_PATH],
    vendor: ["react", "react-dom", "react-router-dom"]
  },
  output: {
    path: OUTPUT_PATH,
    filename: "[name]-[hash:8].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".json", "css", ".less"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]-[local]-[hash:base64:5]",
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader"
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|ttf|woff2|svg)$/,
        use: "url-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new ProgressBarPlugin(), //加个命令行显示的打包进度条
    new HtmlWebpackPlugin({
      showErrors: true,
      template: resolvePath("app/public/index.html"),
      favicon: resolvePath("static/favicon.ico")
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), //保证出错时页面不阻塞，且会在编译结束后报错
    new webpack.HashedModuleIdsPlugin() //用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
  ]
};

function resolvePath(i) {
  return path.resolve(ROOT_PATH, i);
}
