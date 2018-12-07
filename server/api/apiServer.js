/**
 * api请求服务
 *
 * 0: 成功
 * 1: 数据不合法
 * 2: 客户端数据错误
 * 3: 后端错误
 */
import Express from "express";
import config from "../../config/index";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";

const port = config.apiPort;

const app = new Express();
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cookieParser("express_react_cookie"));
app.use(
  session({
    secret: "express_react_cookie",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 30 }
  })
);

app.use("/", require("./main"));
app.use("/admin", require("./admin"));

mongoose.Promise = require("bluebird");
mongoose.connect(
  `mongodb://${config.dbHost}:${config.dbPort}/blog`,
  err => {
    if (err) {
      console.log(err, "数据库连接失败");
      return;
    }
    console.log("数据库连接成功");

    app.listen(port, err => {
      if (err) {
        console.error("err:", err);
        return;
      }
      console.info(
        `===> api server is running at ${config.apiHost}:${config.apiPort}`
      );
    });
  }
);
