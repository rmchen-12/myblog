import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.h1Ref = React.createRef();
    console.log(this.h1Ref);
  }

  componentDidMount() {
    this.h1Ref.current.focus();
  }

  handleClick = () => {
    console.log(this.h1Ref, this.inputRef);
  };

  render() {
    return (
      <div>
        <input ref={this.h1Ref} />
        <input ref={e => (this.inputRef = e)} />
        <button onClick={this.handleClick()} />
        <ul>
          {["a", "b", "c"].map(name => (
            <li key={name}>{`I'm ${name}!`}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
