import React, { Component } from "react";
import "./App.css";
import Menu from "./frontend/components/Menu";
import Home from "./frontend/pages/Home";
import About from "./frontend/pages/About";
import Article from "./frontend/pages/Article";
import NotFound from "./frontend/pages/NotFound";
import articlesList from "./frontend/components/articlesList";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <hr />
        <Router>
          <div className="container">
            <Menu />

            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/articlesList" component={articlesList} />
              <Route path="/Article/:id" component={Article} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
