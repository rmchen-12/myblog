import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table, Pagination } from "antd";
import style from "./index.css";

import { actions } from "../../../reducers/admin/manageUser";

const { get_all_users } = actions;

class ManageUser extends PureComponent {
  componentDidMount() {
    if (this.props.list.length === 0) {
      this.props.getAllUsers();
    }
  }

  getColumns = () => [
    {
      title: "姓名",
      dataIndex: "username",
      key: "name",
      render: text => <a href="#">{text}</a>
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "ID"
    },
    {
      title: "密码(加密后)",
      dataIndex: "password",
      key: "password"
    },
    {
      title: "身份",
      dataIndex: "type",
      key: "address"
    }
  ];

  onChange = pageNum => {
    this.props.getAllUsers(pageNum);
  };

  render() {
    return (
      <div>
        <h2>用户管理</h2>
        <Table
          pagination={false}
          columns={this.getColumns()}
          dataSource={this.props.list}
        />
        <div className={style.pagination}>
          <Pagination
            onChange={this.onChange}
            current={this.props.pageNum}
            total={this.props.total}
          />
        </div>
      </div>
    );
  }
}

ManageUser.propTypes = {
  pageNum: PropTypes.number.isRequired,
  list: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number.isRequired
};

ManageUser.defaultProps = {
  pageNum: 1,
  list: [],
  total: 0
};

const mapStateToProps = (state, ownProps) => {
  const { pageNum, list, total } = state.admin.users;
  return {
    pageNum,
    list,
    total
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllUsers: bindActionCreators(get_all_users, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUser);
