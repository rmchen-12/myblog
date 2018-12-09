import Express from "express";
const router = Express.Router();
import User from "../../models/user";
import { MD5_SUFFIX, responseClient, md5 } from "../util";

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log(username, password);

  if (!username) {
    responseClient(res, 400, 2, "用户名不可为空");
    return;
  }
  if (!password) {
    responseClient(res, 400, 2, "密码不可为空");
    return;
  }
  User.findOne({
    username,
    password: md5(password + MD5_SUFFIX)
  })
    .then(userInfo => {
      if (userInfo) {
        let data = {};
        data.username = userInfo.username;
        data.userType = userInfo.type;
        data.userId = userInfo._id;
        // req.session.userInfo = data;
        responseClient(res, 200, 0, "登录成功", data);
        return;
      }
      responseClient(res, 400, 1, "用户名或密码错误");
    })
    .catch(err => {
      responseClient(res);
    });
});

router.post("/register", (req, res) => {
  let { userName, password, passwordRe } = req.body;
  if (!userName) {
    responseClient(res, 400, 2, "用户名不可为空");
    return;
  }
  if (!password) {
    responseClient(res, 400, 2, "密码不可为空");
    return;
  }
  if (password !== passwordRe) {
    responseClient(res, 400, 2, "两次密码不一致");
    return;
  }

  User.findOne({ username: userName }).then(data => {
    if (data) {
      responseClient(res, 200, 1, "用户名已存在");
      return;
    }
    let user = new User({
      username,
      password: md5(password + MD5_SUFFIX),
      type: "user"
    });
    user
      .save()
      .then(() => {
        User.findOne({ username: userName }).then(userInfo => {
          let data = [];
          data.username = userInfo.username;
          data.userType = userInfo.type;
          data.userId = userInfo._id;
          responseClient(res, 200, 0, "注册成功");
          return;
        });
      })
      .catch(err => {
        responseClient(res);
        return;
      });
  });
});

module.exports = router;
