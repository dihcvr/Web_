import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";

export default class EditFiliere extends Component {
  constructor(props) {
    super(props);

    this.onChangeFiliere = this.onChangeFiliere.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      filiere: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://51.91.98.162:3013/filiere/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          filiere: response.data.filiere
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
      .post(
        "http://51.91.98.162:3013/filiere/update/" + this.props.match.params.id,
        filiere
      )
      .then(res => alert("Fil Update!!"));

    window.location = "/list-filiere";
  }
  render() {
    return (
      <div>
        <br />
        <Row>
          <Col sm="1"></Col>
          <Col sm="11">
            <h3>Modifier filiere</h3>
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
                  value="Edit  filiere Log    "
                />
              </div>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
