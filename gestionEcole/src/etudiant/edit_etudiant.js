import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditAdmin extends Component {
  constructor(props) {
    super(props);

    this.onChangeCne = this.onChangeCne.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeCin = this.onChangeCin.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFiliere = this.onChangeFiliere.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      cne: "",
      nom: "",
      prenom: "",
      cin: "",
      date: new Date(),
      username: "",
      password: "",
      filiere: "",
      filieres: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3013/etudiant/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          cne: response.data.cne,
          nom: response.data.nom,
          prenom: response.data.prenom,
          cin: response.data.cin,
          date: new Date(response.data.date),
          username: response.data.username,
          password: response.data.password,
          filiere: response.data.filiere
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://localhost:3013/filiere/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            filieres: response.data.map(user => user.filiere)
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  onChangeCne(e) {
    this.setState({
      cne: e.target.value
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
  onChangeDate(date) {
    this.setState({
      date: date
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
  onChangeFiliere(e) {
    this.setState({
      filiere: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const etudiant = {
      cne: this.state.cne,
      nom: this.state.nom,
      prenom: this.state.prenom,
      cin: this.state.cin,
      date: this.state.date,
      username: this.state.username,
      password: this.state.password,
      filiere: this.state.filiere
    };

    console.log(etudiant);

    axios
      .post(
        "http://localhost:3013/etudiant/update/" + this.props.match.params.id,
        etudiant
      )
      .then(res => alert("Student Updated !!"));

    window.location = "/list-etudiant";
  }
  render() {
    return (
      <div>
        <br />
        <Row>
          <Col sm="1"></Col>
          <Col sm="7">
            <h3>Edit New Student</h3>
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
              <div>
                <label>Cne: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.cne}
                  onChange={this.onChangeCne}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Date de Naissance: </label>
                <DatePicker
                  required
                  className="form-control"
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </Col>
            <Col sm="1"></Col>
            <Col sm="5">
              <div className="form-group">
                <label>Username: </label>
                <select
                  ref="userInput"
                  required
                  className="form-control"
                  value={this.state.filiere}
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
                  value="Edit  Student Log    "
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
