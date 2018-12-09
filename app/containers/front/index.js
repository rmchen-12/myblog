import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { bindActionCreators } from "redux";

import Test from "./test";
import Home from "./home";
import Detail from "./detail";
import Banner from "./components/banner";
import Menus from "./components/menu";
import NotFound from "../../components/notFound";
import Login from "./components/login";
import Logined from "./components/logined";

import { actions } from "../../reducers/adminManagerTags";
import { actions as FrontActions } from "../../reducers/front";
import { actions as IndexActions } from "../../reducers";

class Front extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { login, register } = this.props;
    return (
      <div>
        <div>{/* <Banner />
          <Menus /> */}</div>
        <div>
          <div>
            <div>
              <Switch>
                {/* <Route exact path={url} component={Home} /> */}
                <Route path={"/detail/:id"} component={Detail} />
                <Route path={"/:tag"} component={Home} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <div>
              <Login login={login} register={register} />
              <Logined />
            </div>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.globalState.userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: bindActionCreators(IndexActions.get_login, dispatch),
    register: bindActionCreators(IndexActions.get_register, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Front);
