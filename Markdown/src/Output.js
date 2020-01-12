import React, { Component } from "react";
import marked from "marked";

class Output extends Component {
  getMarkedownText(data) {
    var rawMarkup = marked(data, { sanitize: true });
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div>
        <h2>Output</h2>
        <div
          className="col-lg-6"
          dangerouslySetInnerHTML={this.getMarkedownText(this.props.data)}
        ></div>
      </div>
    );
  }
}

export default Output;
