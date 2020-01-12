import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";

export default class EditFiliere extends Component {
  constructor(props) {
    super(props);

    this.onChangeElement = this.onChangeElement.bind(this);
    this.onChangecof_element = this.onChangecof_element.bind(this);
    this.onChangecof_ds = this.onChangecof_ds.bind(this);
    this.onChangecof_tp = this.onChangecof_tp.bind(this);
    this.onChangecof_exam = this.onChangecof_exam.bind(this);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangefiliere = this.onChangefiliere.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      element: "",
      cof_element: 1,
      cof_ds: 1,
      cof_tp: 1,
      cof_exam: 1,
      username: "",
      filiere: "",
      filieres: [],
      enseignants: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3013/element/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          element: response.data.element,
          cof_element: response.data.cof_element,
          cof_ds: response.data.cof_ds,
          cof_tp: response.data.cof_tp,
          cof_exam: response.data.cof_exam,
          username: response.data.username,
          filiere: response.data.filiere
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("http://51.91.98.162:3013/filiere/")
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
      .get("http://51.91.98.162:3013/enseignant/")
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
  onChangecof_element(e) {
    this.setState({
      cof_element: e.target.value
    });
  }
  onChangecof_ds(e) {
    this.setState({
      cof_ds: e.target.value
    });
  }
  onChangecof_tp(e) {
    this.setState({
      cof_tp: e.target.value
    });
  }
  onChangecof_exam(e) {
    this.setState({
      cof_exam: e.target.value
    });
  }
  onChangedate(e) {
    this.setState({
      date: e.target.value
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
      cof_element: this.state.cof_element,
      cof_ds: this.state.cof_ds,
      cof_tp: this.state.cof_tp,
      cof_exam: this.state.cof_exam,
      username: this.state.username,
      filiere: this.state.filiere
    };

    console.log(element);

    axios
      .post(
        "http://51.91.98.162:3013/element/update/" + this.props.match.params.id,
        element
      )
      .then(res => alert("Element updated !!"));

    window.location = "/list-element";
  }
  render() {
    return (
      <div>
        <br />
        <Row>
          <Col sm="1"></Col>
          <Col sm="11">
            <h3>Edit New Element</h3>
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
                  value={this.state.element}
                  className="form-control"
                  onChange={this.onChangeelement}
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
                  value={this.state.cof_element}
                  onChange={this.onChangeElement}
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
                  value={this.state.cof_tp}
                  className="form-control"
                  onChange={this.onChangecof_tp}
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
                  value={this.state.cof_ds}
                  className="form-control"
                  onChange={this.onChangecof_ds}
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
                  value={this.state.cof_exam}
                  className="form-control"
                  onChange={this.onChangecof_exam}
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
              <div className="form-control">
                <br />
                <br />
                <input
                  type="submit"
                  required
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
