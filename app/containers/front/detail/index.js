import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Icon } from "antd";
import remark from "remark";
import react2markdown from "remark-react";
import moment from "moment";
import style from "./index.css";

import { actions } from "../../../reducers/front";
const { get_article_detail } = actions;

class Detail extends PureComponent {
  componentDidMount() {
    this.props.get_article_detail(this.props.location.state.id);
  }

  render() {
    const {
      articleContent,
      title,
      author,
      viewCount,
      commentCount,
      time
    } = this.props;

    return (
      <div className={style.container}>
        <h2>{title}</h2>
        <div className={style.articleInfo}>
          <span>
            <Icon type={"user"} className={style.icon} />
            {author}
          </span>
          <span>
            <Icon type={"clock-circle"} className={style.icon} />
            {moment(time).format("YYYY-MM-DD HH:MM:ss")}
          </span>
          <span>
            <Icon type={"highlight"} className={style.icon} />
            {commentCount}
          </span>
          <span>
            <Icon type={"eye"} className={style.icon} /> {viewCount}
          </span>
        </div>
        <div id="preview" className={style.content}>
          {
            remark()
              .use(react2markdown)
              .processSync(articleContent).contents
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    content,
    title,
    author,
    viewCount,
    commentCount,
    time
  } = state.front.articleDetail;
  return {
    articleContent: content,
    title,
    author,
    viewCount,
    commentCount,
    time
  };
};

function mapDispatchToProps(dispatch) {
  return {
    get_article_detail: bindActionCreators(get_article_detail, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
