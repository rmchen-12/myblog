import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, Button } from "antd";
import { connect } from "react-redux";
import { isEqual } from "lodash";

import { actions } from "../../../reducers/admin/manageTags";
const { get_all_tags, delete_tag, add_tag } = actions;

class manageTags extends PureComponent {
  state = {
    inputVisible: false,
    InputValue: ""
  };

  componentDidMount() {
    this.props.getAllTags();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.tags, prevProps.tags)) {
      this.props.getAllTags();
    }
  }

  handleClose = tag => {
    this.props.deleteTag(tag);
  };

  showInput = () => {
    this.setState(
      {
        inputVisible: true
      },
      () => {
        this.input.focus();
      }
    );
  };

  handleInputChange = e => {
    this.setState({ InputValue: e.target.value });
  };

  handleInputConfirm = () => {
    this.state.InputValue && this.props.addTag(this.state.InputValue);
    this.setState({
      inputVisible: false,
      InputValue: ""
    });
  };

  render() {
    const { inputVisible, InputValue } = this.state;
    const { tags } = this.props;
    return (
      <div>
        <h2>标签管理</h2>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagEle = (
            <Tag
              key={tag}
              closable={index !== 0}
              afterClose={this.handleClose.bind(this, tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip key={tag} title={tag}>
              {tagEle}
            </Tooltip>
          ) : (
            tagEle
          );
        })}
        {inputVisible ? (
          <Input
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
            value={InputValue}
            ref={ref => (this.input = ref)}
          />
        ) : (
          <Button size="small" type="dashed" onClick={this.showInput}>
            +New Tag
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tags: state.admin.tags
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllTags: bindActionCreators(get_all_tags, dispatch),
    deleteTag: bindActionCreators(delete_tag, dispatch),
    addTag: bindActionCreators(add_tag, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(manageTags);
