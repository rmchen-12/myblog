import React, { PureComponent } from "react";
import { Menu } from "antd";
import style from "./index.css";

class Menus extends PureComponent {
  state = { current: this.props.categories[0] };

  handleClick = e => {
    if (e.key === "首页") {
      this.props.getArticleList("");
    } else {
      this.props.getArticleList(e.key);
    }
    let toPath = e.key == "首页" ? "/" : "/" + e.key;
    this.setState({
      current: e.key
    });
    this.props.history.push(toPath);
  };

  render() {
    return (
      <Menu
        className={style.MenuContainer}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        {this.props.categories.map((item, index) => (
          <Menu.Item key={item}>{item}</Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default Menus;
