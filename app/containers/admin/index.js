import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import PropTypes from "prop-types";
import style from "./index.css";

import NotFound from "../../components/notFound";
import Index from "./adminIndex";
import ManageUser from "./manageUser";
import ManageArticle from "./manageArticle";
import ManageTags from "./manageTags";
import ManageComment from "./manageComment";
import Detail from "./detail";
import NewArticle from "./newArticle";

import { bindActionCreators } from "redux";
import { actions } from "../../reducers/admin";

const { change_location_admin } = actions;
const { Header, Content, Footer, Sider } = Layout;
const menus = [
  { url: "/", name: "首页", iconType: "home" },
  { url: "/manageUser", name: "用户管理", iconType: "usergroup-delete" },
  { url: "/newArticle", name: "发文", iconType: "file-text" },
  { url: "/manageTags", name: "标签管理", iconType: "tags-o" },
  { url: "/manageArticle", name: "文章管理", iconType: "edit" }
];

class Admin extends PureComponent {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   this.props.change_location_admin(
  //     window.location.pathname.replace(/\/admin/, "") || "/"
  //   );
  // }

  render() {
    const {
      match: { url },
      userInfo,
      history,
      change_location_admin
    } = this.props;
    if (userInfo && userInfo.userType) {
      return (
        <div>
          {userInfo.userType === "admin" ? (
            <Layout>
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
              >
                <div className={style.logo} />
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={["/"]}
                  onClick={({ key }) => {
                    change_location_admin(key);
                    history.push(`/admin${key}`);
                  }}
                >
                  {menus.map(item => (
                    <Menu.Item key={item.url}>
                      <Icon type={item.iconType} />
                      <span>{item.name}</span>
                    </Menu.Item>
                  ))}
                </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: "#fff", padding: 0 }}>
                  <Icon
                    className={style.trigger}
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                  />
                </Header>
                <Content className={style.content}>
                  <Switch>
                    <Route exact path={url} component={Index} />
                    <Route
                      exact
                      path={`${url}/manageUser`}
                      component={ManageUser}
                    />
                    <Route path={`${url}/manageTags`} component={ManageTags} />
                    <Route path={`${url}/newArticle`} component={NewArticle} />
                    <Route
                      path={`${url}/manageArticle`}
                      component={ManageArticle}
                    />
                    <Route
                      path={`${url}/manageComment`}
                      component={ManageComment}
                    />
                    <Route path={`${url}/detail`} component={Detail} />
                    <Route component={NotFound} />
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}

Admin.defaultProps = {
  adminUrl: "/"
};

Admin.propsTypes = {
  adminUrl: PropTypes.string,
  change_location_admin: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    adminUrl: state.admin.adminGlobalState,
    userInfo: state.globalState.userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    change_location_admin: bindActionCreators(change_location_admin, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
