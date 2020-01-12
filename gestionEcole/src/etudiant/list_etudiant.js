import React, { Component } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
  Table
} from "reactstrap";
import classnames from "classnames";
import CreateEtudiant from "./create_etudiant";
const Etudiant = props => (
  <tr>
    <th scope="row"> .</th>
    <td>{props.etudiant.cne}</td>
    <td>{props.etudiant.nom}</td>
    <td>{props.etudiant.prenom}</td>
    <td>{props.etudiant.cin}</td>
    <td>{props.etudiant.date}</td>
    <td>{props.etudiant.filiere}</td>
    <td>{props.etudiant.username}</td>
    <td>{props.etudiant.password}</td>

    <td>
      <Button color="secondary" active>
        <Link to={"/edit-etudiant/" + props.etudiant._id}>edit</Link>
      </Button>
    </td>
    <td>
      <Button
        color="danger"
        onClick={() => {
          props.deleteEtudiant(props.etudiant._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

class Etudiants extends Component {
  constructor(props) {
    super(props);

    this.deleteEtudiant = this.deleteEtudiant.bind(this);

    this.state = { etudiant: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3013/etudiant/")
      .then(response => {
        this.setState({ etudiant: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteEtudiant(id) {
    axios
      .delete("http://localhost:3013/etudiant/delete/" + id)
      .then(response => {
        alert("Student Deleted !!");
      });

    this.setState({
      etudiant: this.state.etudiant.filter(el => el._id !== id)
    });
  }

  etudiantList() {
    return this.state.etudiant.map(currentetudiant => {
      return (
        <Etudiant
          etudiant={currentetudiant}
          deleteEtudiant={this.deleteEtudiant}
          key={currentetudiant._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <br />
        <h3>Liste des etudiants</h3>
        <Row>
          <Col sm="1"></Col>
          <Col sm="10">
            <Table className="table">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Cne</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Cin</th>
                  <th>Date de naissance</th>
                  <th>Filiere</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>{this.etudiantList()}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const ListEtudiant = props => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Liste des etudiants
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Ajouter un etudiant
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Etudiants />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <CreateEtudiant />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ListEtudiant;
