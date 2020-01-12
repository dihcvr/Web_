import React, { Component } from "react";
//import articlesData from "../articlesData";
import NotFound from "./NotFound";
import { Link } from "react-router-dom";

class Article extends Component {
  state = {
    count: 0,
    Articles: [],
    art: []
  };
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  handlIcrement = () => {
    this.setState({ count: this.state.count + 1 });
    this.getVote();
  };
  componentDidMount() {
    this.getArticles();
    /*
    setInterval(() => {
      this.getVote();
    }, 1000);
    */
  }

  getArticles = () => {
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
  };
  getVote = () => {
    fetch("http://localhost:5000/vote/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        count: this.state.count,
        id: this.props.match.params.id
      })
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
  };

  render() {
    const id = this.props.match.params.id;
    var article = this.state.Articles.find(art => art.id == id);
    const relatedArticles = this.state.Articles.filter(art => art.id != id);

    if (article) {
      return (
        <div>
          <div className="card col-md-12 my-4 ">
            <div className="card-body my-4">
              <h4 className="card-title">
                {article.titre}
                <span className={this.getBadgeClasses()}>
                  {article.vote === 0 ? "Zero" : article.vote}
                </span>
              </h4>

              <p className="card-text">{article.sujet}</p>
              <button
                onClick={this.handlIcrement}
                className="btn btn-primary btn-sm"
              >
                Vote
              </button>
            </div>
          </div>
          <hr />
          <h2>Realated Article</h2>
          {relatedArticles.map(a => (
            <div className="card col-md-12 my-4 ">
              <div className="card-body my-4">
                <h4 className="card-title">{a.titre}</h4>
                <p className="card-text">{a.sujet[0].substring(0, 100)}</p>
                <button type="button" class="btn btn-dark">
                  <Link to={`/Article/${a.id}`}>Plus Informations</Link>{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    } else return <NotFound />;
  }
}

export default Article;
