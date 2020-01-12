import React, { Component } from "react";
import "./App.css";
import Header from "./header";
import Input from "./Input";
import Output from "./Output";
import "./bootstrap.min.css";

class App extends Component {
  state = {
    data: ""
  };

  changeHandel(e) {
    const data = e.target.value;

    this.setState({ data: data });
  }

  render() {
    return (
      <div className=" container">
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <Input onChangeHandler={e => this.changeHandel(e)} />
          <Output data={this.state.data} />
        </div>
      </div>
    );
  }
}
export default App;
