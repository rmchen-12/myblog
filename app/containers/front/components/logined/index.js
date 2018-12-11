import React, { PureComponent } from "react";
import { Button, Row, Col } from "antd";
import style from "./index.css";

export default function Logined(props) {
  const { userInfo } = props;

  return (
    <div className={style.layout}>
      <p>欢迎：{userInfo.username}</p>
      <p>光临我的博客</p>
      {props.userInfo.userType === "admin" ? (
        <Button onClick={() => props.history.push("/admin")} type="primary">
          点击进入管理页面
        </Button>
      ) : null}
    </div>
  );
}
