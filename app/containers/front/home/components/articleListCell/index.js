import React from "react";
import style from "./index.css";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import moment from "moment";

export const ArticleListCell = props => (
  <div
    className={`${style.container} `}
    onClick={() => {
      props.history.push(`/detail/${props.data._id}`, { id: props.data._id });
      props.getArticleDetail(props.data._id);
    }}
  >
    <div className={style.content}>
      <h4 className={style.title}>{props.data.title}</h4>
      <div className={style.bottom}>
        <div className={style.iconList}>
          <span>
            <Icon type="clock-circle" className={style.icon} />
            {moment(props.data.time).format("YYYY-MM-DD HH:MM:ss")}
          </span>
          <span>
            <Icon type="eye" className={style.icon} />
            {props.data.viewCount}
          </span>
          <span>
            <Icon type="highlight" className={style.icon} />
            {props.data.commentCount}
          </span>
        </div>
        <div className={style.readText}>
          阅读全文 <span>>></span>
        </div>
      </div>
    </div>
  </div>
);
