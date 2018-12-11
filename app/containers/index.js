import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { notification, Spin } from "antd";
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

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.notification &&
      this.props.notification.content &&
      this.props.notification !== prevProps.notification
    ) {
      this.props.notification.type === 1
        ? this.openNotification("success", this.props.notification.content)
        : this.openNotification("error", this.props.notification.content);
    } else {
      return;
    }
  }

  openNotification = (type, message) => {
    notification[type]({
      message: message,
      description: "",
      onClose: () => {
        this.props.clear_msg();
      }
    });
  };

  render() {
    let { isFetching } = this.props;

    return (
      <Router>
        <div>
          <Switch>
            <Route path="/404" component={NotFound} />
            <Route path="/admin" component={Admin} />
            <Route component={Front} />
          </Switch>
          {isFetching && <Spin />}
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
