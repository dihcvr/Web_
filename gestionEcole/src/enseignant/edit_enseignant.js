import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";

export default class EditEnseignant extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeCin = this.onChangeCin.bind(this);
    this.onChangeDepartement = this.onChangeDepartement.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      nom: "",
      prenom: "",
      cin: "",
      password: "",
      departement: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3013/enseignant/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          nom: response.data.nom,
          prenom: response.data.prenom,
          cin: response.data.cin,
          password: response.data.password,
          departement: response.data.departement
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    });
  }
  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    });
  }
  onChangeCin(e) {
    this.setState({
      cin: e.target.value
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeDepartement(e) {
    this.setState({
      departement: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const enseignant = {
      username: this.state.username,
      nom: this.state.nom,
      prenom: this.state.prenom,
      cin: this.state.cin,
      password: this.state.password,
      departement: this.state.departement
    };

    console.log(enseignant);

    axios
      .post(
        "http://localhost:3013/enseignant/update/" + this.props.match.params.id,
        enseignant
      )
      .then(res => alert("Prof updated !!"));

    window.location = "/list-enseignant";
  }
  render() {
    return (
      <div>
        <br />
        <Row>
          <Col sm="1"></Col>
          <Col sm="7">
            <h3>Edit Prof</h3>
          </Col>
        </Row>
        <br />
        <form onSubmit={this.onSubmit}>
          <Row>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Nom: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.nom}
                  onChange={this.onChangeNom}
                />
              </div>
            </Col>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Prenom: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.prenom}
                  onChange={this.onChangePrenom}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Cin: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.cin}
                  onChange={this.onChangeCin}
                />
              </div>
            </Col>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Departement: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.departement}
                  onChange={this.onChangeDepartement}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Username: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
            </Col>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Password: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm="6"></Col>

            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <input
                  type="submit"
                  required
                  value="Edit  Prof Log  "
                  className="btn btn-primary"
                />
              </div>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
