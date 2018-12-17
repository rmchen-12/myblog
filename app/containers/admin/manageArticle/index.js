import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Pagination, List } from "antd";
import { ArticleCell } from "./articleCell";
import style from "./index.css";

import { actions } from "../../../reducers/admin/manageArticle";
import { actions as FrontActions } from "../../../reducers/front";

const { get_article_list, delete_article, edit_article } = actions;
const { get_article_detail } = FrontActions;

class manageArticle extends PureComponent {
  state = {};

  componentDidMount() {
    if (this.props.articleList.length === 0) {
      this.props.get_article_list();
    }
  }

  render() {
    const {
      articleList,
      edit_article,
      get_article_detail,
      delete_article,
      get_article_list,
      history,
      pageNum,
      total
    } = this.props;

    return (
      <div>
        <h2>文章管理</h2>
        <div className={styleMedia.articleListContainer}>
          {articleList.map((item, index) => (
            <ArticleCell
              editArticle={id => edit_article(id)}
              getArticleDetail={id => get_article_detail(id)}
              delete={id => delete_article(id)}
              history={history}
              data={item}
              key={index}
            />
          ))}
        </div>
        <div className={style.pagination}>
          <Pagination
            defaultPageSize={5}
            onChange={pageNum => get_article_list(pageNum)}
            current={pageNum}
            total={total}
          />
        </div>
      </div>
    );
  }
}

manageArticle.defaultProps = {
  articleList: [],
  pageNum: 1,
  total: 0
};

manageArticle.propTypes = {
  articleList: PropTypes.array,
  pageNum: PropTypes.number,
  total: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  const { articleList, pageNum, total } = state.admin.articles;
  return {
    articleList: articleList,
    pageNum: pageNum,
    total: total
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_article_list: bindActionCreators(get_article_list, dispatch),
    delete_article: bindActionCreators(delete_article, dispatch),
    edit_article: bindActionCreators(edit_article, dispatch),
    get_article_detail: bindActionCreators(get_article_detail, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(manageArticle);
