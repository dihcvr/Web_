import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/sign_in";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Dash from "./components/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  state = {
    ch: false,
    tt: ""
  };

  handconn = () => {
    this.setState({
      ch: true
    });
  };

  render() {
    return (
      <div>
        <div>{this.state.ch ? "" : <Navbar />}</div>
        <Router>
          <Route
            path="/"
            exact
            render={props => (
              <SignIn conn={this.handconn} c={this.hand}>
                {" "}
              </SignIn>
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
