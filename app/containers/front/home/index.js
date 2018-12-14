import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Pagination } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ArticleList from "./components/articleList";
import style from "./index.css";

import { actions as frontActions } from "../../../reducers/front";
const { get_article_detail, get_article_list } = frontActions;

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.get_article_list(this.props.match.params.tag || "");
  }

  onChange = pageNum => {
    this.props.get_article_list(this.props.match.params.tag || "", pageNum);
  };

  render() {
    const {
      tags,
      userInfo,
      match,
      location,
      history,
      articleList,
      get_article_detail,
      pageNum,
      total
    } = this.props;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    return tags.length > 1 &&
      match.params.tag &&
      (tags.indexOf(match.params.tag) === -1 ||
        location.pathname.lastIndexOf("/") > 0) ? (
      <Redirect to="/404" />
    ) : (
      <div className={style.home}>
        <ArticleList
          history={history}
          data={articleList}
          getArticleDetail={get_article_detail}
        />
        <div className={style.pagination}>
          <Pagination
            defaultPageSize={5}
            onChange={this.onChange}
            current={pageNum}
            total={total}
          />
        </div>
      </div>
    );
  }
}

Home.defaultProps = {
  userInfo: {},
  pageNum: 1,
  total: 0,
  articleList: []
};

Home.propsTypes = {
  pageNum: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  articleList: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    tags: state.admin.tags,
    pageNum: state.front.pageNum,
    total: state.front.total,
    articleList: state.front.articleList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_article_list: bindActionCreators(get_article_list, dispatch),
    get_article_detail: bindActionCreators(get_article_detail, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
