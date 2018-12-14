import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Select, Button, Modal } from "antd";
import remark from "remark";
import remark2react from "remark-react";
import style from "./index.css";
import moment from "moment";

import { actions } from "../../../reducers/admin/manageNewArticle";
import { actions as tagActions } from "../../../reducers/admin/manageTags";

const { get_all_tags } = tagActions;
const { update_content, update_tags, update_title, save_article } = actions;
const Option = Select.Option;
const TextArea = Input.TextArea;

class newArticle extends PureComponent {
  state = {
    modalVisible: false
  };

  componentDidMount() {
    this.props.get_all_tags();
  }

  selectTags = value => {
    this.props.update_tags(value);
  };

  handleTitleChange = e => {
    this.props.update_title(e.target.value);
  };

  handleTextAreaChange = e => {
    this.props.update_content(e.target.value);
  };

  preview = () => {
    this.setState({
      modalVisible: true
    });
  };

  publish = () => {
    const { title, content, tags, save_article } = this.props;
    let articleData = {};
    articleData.title = title;
    articleData.content = content;
    articleData.tags = tags;
    articleData.isPublish = true;
    articleData.time = moment(new Date(), "yyyy-mm-dd HH:MM:ss");
    save_article(articleData);
  };

  save = () => {
    const { title, content, tags, save_article } = this.props;
    let articleData = {};
    articleData.title = title;
    articleData.content = content;
    articleData.tags = tags;
    articleData.isPublish = false;
    articleData.time = moment(new Date(), "yyyy-mm-dd HH:MM:ss");
    save_article(articleData);
  };

  handleOk = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const { title, content, tags, tagsBase } = this.props;
    const { modalVisible } = this.state;

    return (
      <div className={style.newArticle}>
        <h2>发文</h2>
        <div className={style.content}>
          <span className={style.title}>标题</span>
          <Input
            className={style.titleInput}
            placeholder={"请输入文章标题"}
            type="text"
            value={title}
            onChange={this.handleTitleChange}
          />
          <span className={style.title}>正文</span>
          <TextArea
            className={style.textArea}
            value={content}
            onChange={this.handleTextAreaChange}
          />
          <span className={style.title}>分类</span>
          <Select
            mode="multiple"
            placeholder="请选择分类"
            onChange={this.selectTags}
            value={tags}
          >
            {tagsBase.map(item => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>

          <div>
            <Button
              type="primary"
              className={style.button}
              onClick={this.publish}
            >
              发布
            </Button>
            <Button type="primary" className={style.button} onClick={this.save}>
              保存
            </Button>
            <Button
              type="primary"
              className={style.button}
              onClick={this.preview}
            >
              预览
            </Button>
          </div>
        </div>
        <Modal
          visible={modalVisible}
          title="文章预览"
          onOk={this.handleOk}
          onCancel={this.handleOk}
          footer={null}
        >
          <div>
            <div>
              {
                remark()
                  .use(remark2react)
                  .processSync(content).contents
              }
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

newArticle.propsTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.array,
  tagsBase: PropTypes.array
};

newArticle.defaultProps = {
  title: "",
  content: "",
  tags: [],
  tagsBase: []
};

const mapStateToProps = (state, ownProps) => {
  const { title, content, tags } = state.admin.newArticle;
  let tempArr = state.admin.tags;
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i] === "首页") {
      tempArr.splice(i, 1);
    }
  }
  return { title, content, tags, tagsBase: tempArr };
};

function mapDispatchToProps(dispatch) {
  return {
    update_tags: bindActionCreators(update_tags, dispatch),
    update_title: bindActionCreators(update_title, dispatch),
    update_content: bindActionCreators(update_content, dispatch),
    get_all_tags: bindActionCreators(get_all_tags, dispatch),
    save_article: bindActionCreators(save_article, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(newArticle);
