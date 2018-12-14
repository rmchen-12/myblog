import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Layout, Row, Col } from "antd";

import Home from "./home";
import Detail from "./detail";
import Banner from "./components/banner";
import Menus from "./components/menu";
import NotFound from "../../components/notFound";
import Login from "./components/login";
import Logined from "./components/logined";
import style from "./index.css";

import { actions } from "../../reducers/admin/manageTags";
import { actions as FrontActions } from "../../reducers/front";
import { actions as IndexActions } from "../../reducers";

const { get_article_list } = FrontActions;
const { get_all_tags } = actions;
const { get_login, get_register } = IndexActions;
const { Header, Content } = Layout;

class Front extends PureComponent {
  state = {};

  componentDidMount() {
    this.props.get_all_tags();
  }

  getArticleList = tag => {
    this.props.get_article_list(tag, 1);
  };

  render() {
    const {
      login,
      register,
      userInfo,
      history,
      categories,
      match: { url }
    } = this.props;
    return (
      <Layout className={style.layout}>
        <Header>
          <div>
            <Banner />
            <Menus
              getArticleList={this.getArticleList}
              categories={categories}
              history={history}
            />
          </div>
        </Header>
        <Content className={style.content}>
          <Row type={"flex"} justify={"center"} align={"top"}>
            <Col span={13} className={style.article}>
              <Switch>
                <Route exact path={url} component={Home} />
                <Route path={"/detail/:id"} component={Detail} />
                <Route path={"/:tag"} component={Home} />
                <Route component={NotFound} />
              </Switch>
            </Col>
            <Col span={5} className={style.login}>
              {userInfo.userId ? (
                <Logined history={history} userInfo={userInfo} />
              ) : (
                <Login login={login} register={register} />
              )}
            </Col>
          </Row>
        </Content>
        <div />
      </Layout>
    );
  }
}

Front.defaultProps = {
  categories: []
};

Front.propTypes = {
  categories: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.globalState.userInfo,
    categories: state.admin.tags
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_all_tags: bindActionCreators(get_all_tags, dispatch),
    get_article_list: bindActionCreators(get_article_list, dispatch),
    login: bindActionCreators(get_login, dispatch),
    register: bindActionCreators(get_register, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Front);
