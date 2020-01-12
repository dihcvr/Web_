import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";

export default class CreateElement extends Component {
  constructor(props) {
    super(props);

    this.onChangeElement = this.onChangeElement.bind(this);
    this.onChangeCof_element = this.onChangeCof_element.bind(this);
    this.onChangeCof_ds = this.onChangeCof_ds.bind(this);
    this.onChangeCof_tp = this.onChangeCof_tp.bind(this);
    this.onChangeCof_exam = this.onChangeCof_exam.bind(this);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangefiliere = this.onChangefiliere.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      element: "",
      cele: 0,
      cds: 0,
      ctp: 0,
      cex: 0,
      username: "",
      filiere: "",
      filieres: [],
      enseignants: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3013/filiere/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            filieres: response.data.map(user => user.filiere),
            filiere: response.data[0].filiere
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:3013/enseignant/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            enseignants: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  onChangeElement(e) {
    this.setState({
      element: e.target.value
    });
  }
  onChangeCof_element(e) {
    this.setState({
      cele: e.target.value
    });
  }
  onChangeCof_ds(e) {
    this.setState({
      cds: e.target.value
    });
  }
  onChangeCof_tp(e) {
    this.setState({
      ctp: e.target.value
    });
  }
  onChangeCof_exam(e) {
    this.setState({
      cex: e.target.value
    });
  }
  onChangeusername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangefiliere(e) {
    this.setState({
      filiere: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const element = {
      element: this.state.element,
      cof_element: this.state.cele,
      cof_ds: this.state.cds,
      cof_tp: this.state.ctp,
      cof_exam: this.state.cex,
      username: this.state.username,
      filiere: this.state.filiere
    };

    console.log(element);

    axios
      .post("http://localhost:3013/element/add", element)
      .then(res => alert("Element added!!"));

    window.location = "/list-element";
  }
  render() {
    return (
      <div>
        <br />
        <Row>
          <Col sm="1"></Col>
          <Col sm="11">
            <h3>Create New Element</h3>
          </Col>
        </Row>
        <br />
        <form onSubmit={this.onSubmit}>
          <Row>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Nom de l'element: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.onChangeElement}
                />
              </div>
            </Col>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Coefficient de l'element: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={e => this.onChangeCof_element(e)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Coefficient de Tp: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={e => this.onChangeCof_tp(e)}
                />
              </div>
            </Col>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Coefficient de Ds: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={e => this.onChangeCof_ds(e)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Coefficient de l'examen: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={e => this.onChangeCof_exam(e)}
                />
              </div>
            </Col>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Enseignant: </label>
                <select
                  ref="userInput"
                  required
                  className="form-control"
                  onChange={this.onChangeusername}
                >
                  {this.state.enseignants.map(function(username) {
                    return (
                      <option key={username} value={username}>
                        {username}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>filiere: </label>
                <select
                  ref="userInput"
                  required
                  className="form-control"
                  onChange={this.onChangeFiliere}
                >
                  {this.state.filieres.map(function(filiere) {
                    return (
                      <option key={filiere} value={filiere}>
                        {filiere}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Col>
            <Col sm="1"></Col>
            <Col sm="5">
              <div>
                <br /> <br />
                <input
                  type="submit"
                  required
                  className="form-control"
                  className="btn btn-primary"
                  value="Create  Element Log    "
                />
              </div>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
