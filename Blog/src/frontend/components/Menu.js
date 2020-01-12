import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Blog
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/About" className="nav-link">
                About
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/ArticlesList" className="nav-link">
                Articles
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Menu;
