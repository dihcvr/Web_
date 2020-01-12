import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";

export default class CreateFiliere extends Component {
  constructor(props) {
    super(props);

    this.onChangeFiliere = this.onChangeFiliere.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      filiere: ""
    };
  }
  onChangeFiliere(e) {
    this.setState({
      filiere: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const filiere = {
      filiere: this.state.filiere
    };

    console.log(filiere);

    axios
      .post("http://localhost:3013/filiere/add", filiere)
      .then(res => alert("Fil added!!"));

    window.location = "/list-filiere";
  }
  render() {
    return (
      <div>
        <br />
        <Row>
          <Col sm="1"></Col>
          <Col sm="11">
            <h3>Create New filiere</h3>
          </Col>
        </Row>
        <br />
        <form onSubmit={this.onSubmit}>
          <Row>
            <Col sm="2"></Col>
            <Col sm="10">
              <label>filiere: </label>
            </Col>
          </Row>
          <Row>
            <Col sm="2"></Col>
            <Col sm="5">
              <div className="form-group">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.filiere}
                  onChange={this.onChangeFiliere}
                />
              </div>
            </Col>

            <Col sm="5">
              <div className="form-group">
                <input
                  type="submit"
                  required
                  className="btn btn-primary"
                  value="Create  filiere Log    "
                />
              </div>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
