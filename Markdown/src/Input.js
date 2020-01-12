import React, { Component } from "react";

class Input extends Component {
  render() {
    return (
      <div className="col-lg-6">
        <h2>Input</h2>
        <textarea
          onChange={e => this.props.onChangeHandler(e)}
          value={this.props.data}
          rows={16}
          className="form-control"
        ></textarea>
      </div>
    );
  }
}

export default Input;
