import React, { PureComponent } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { notification } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../reducers";
import NotFound from "../components/notFound";
import Front from "./front";
import Admin from "./admin";

const { clear_msg, user_auth } = actions;

class App extends PureComponent {
  componentDidMount() {
    this.props.user_auth();
  }

  render() {
    let { isFetching } = this.props;
    // console.log(isFetching, notification, userInfo);

    return (
      <Router>
        <div>
          <Switch>
            <Route path="/404" component={NotFound} />
            <Route path="/admin" component={Admin} />
            <Route component={Front} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.globalState.msg,
    isFetching: state.globalState.isFetching,
    userInfo: state.globalState.userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clear_msg: bindActionCreators(clear_msg, dispatch),
    user_auth: bindActionCreators(user_auth, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
