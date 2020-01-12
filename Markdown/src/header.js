import React, { Component } from "react";

class Header extends Component {
  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "BLACK",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center"
    };
    return (
      <div className="col-sm-12">
        <h1 style={mystyle}>Markdown</h1>
      </div>
    );
  }
}

export default Header;
