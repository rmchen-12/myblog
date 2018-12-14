import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { List, Pagination } from "antd";

import moduleName from "../../../reducers/manageArticle";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>Home</div>;
  }
}

export default Home;
