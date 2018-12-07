import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { Pagination } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as frontActions } from "../../../reducers/front";
import ArticleList from "./components/articleList";

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
