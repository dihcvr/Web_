import React, { Component } from "react";
import axios from "axios";
//import articlesData from "../articlesData";
import { Link } from "react-router-dom";

class articlesList extends Component {
  state = {
    Articles: []
  };
  constructor() {
    super();
    this.state = { Articles: [] };
  }
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }
  componentDidMount() {
    fetch("http://localhost:5000/articles/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        var count = responseJson.length;
        let Fonction = [];
        for (var i = 0; i < count; i++) {
          Fonction.push({
            id: responseJson[i].id,
            vote: responseJson[i].vote,
            Nom: responseJson[i].Nom,
            titre: responseJson[i].titre,
            sujet: responseJson[i].sujet
          });
        }
        this.setState({ Articles: Fonction });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <div className="row ">
          {this.state.Articles.map(article => (
            <div className="card col-md-12 my-4 ">
              <div className="card-body my-4">
                <h4 className="card-title">
                  {article.titre}
                  <span className={this.getBadgeClasses()}>
                    {article.vote === 0 ? "Zero" : article.vote}
                  </span>
                </h4>

                <p className="card-text">
                  {article.sujet[0].substring(0, 100)}
                </p>
                <button
                  type="button"
                  class="btn btn-dark bg-dark btn-expand-lg"
                >
                  <Link to={`/Article/${article.id}`} className="btn-brand">
                    Plus Informations
                  </Link>{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default articlesList;
