import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { bindActionCreators } from "redux";

import Test from "./test";
import Home from "./home";
import { Detail } from "./detail";
import Banner from "./components/banner";
import Menus from "./components/menu";
import NotFound from "../../components/notFound";
import Login from "./home/components/login";
import { logined } from "./home/components/logined";

import { actions } from "../../reducers/adminManagerTags";
import { actions as FrontActions } from "../../reducers/front";
import { actions as IndexActions } from "../../reducers";
import Admin from "../admin";

class Front extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>
          <Test />
          <Banner />
          <Menus />
        </div>
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
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default Front;
