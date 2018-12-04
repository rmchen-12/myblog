module.exports = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-import": {}, //解决@import引入路径问题
    "postcss-url": {}, //该插件主要用来处理文件，比如图片文件、字体文件等引用路径的处理.
    autoprefixer: {
      browsers: [
        "last 2 versions",
        "Firefox ESR",
        "> 1%",
        "ie >= 8",
        "iOS >= 8",
        "Android >= 4"
      ]
    } //自动处理浏览器前缀，不用在一个个加前缀啦
  }
};
