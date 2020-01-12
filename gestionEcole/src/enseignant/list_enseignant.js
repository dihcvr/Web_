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

import CreateEnseignant from "./create_enseignant";
const Enseignant = props => (
  <tr>
    <th scope="row"> .</th>
    <td>{props.enseignant.username}</td>
    <td>{props.enseignant.nom}</td>
    <td>{props.enseignant.prenom}</td>
    <td>{props.enseignant.cin}</td>
    <td>{props.enseignant.departement}</td>
    <td>
      <Button color="secondary" active>
        <Link to={"/edit-enseignant/" + props.enseignant._id}>edit</Link>
      </Button>
    </td>
    <td>
      <Button
        color="danger"
        onClick={() => {
          props.deleteEnseignant(props.enseignant._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

class Enseignants extends Component {
  constructor(props) {
    super(props);

    this.deleteEnseignant = this.deleteEnseignant.bind(this);

    this.state = { enseignant: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3013/enseignant/")
      .then(response => {
        this.setState({ enseignant: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteEnseignant(id) {
    axios
      .delete("http://localhost:3013/enseignant/delete/" + id)
      .then(response => {
        console.log(response.data);
        alert("Prof deleted !!");
      });

    this.setState({
      enseignant: this.state.enseignant.filter(el => el._id !== id)
    });
  }

  enseignantList() {
    return this.state.enseignant.map(currentenseignant => {
      return (
        <Enseignant
          enseignant={currentenseignant}
          deleteEnseignant={this.deleteEnseignant}
          key={currentenseignant._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <br />
        <h3>Liste des enseignant</h3>
        <Row>
          <Col sm="1"></Col>
          <Col sm="10">
            <Table className="table">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Cin</th>
                  <th>Post</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>{this.enseignantList()}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const ListEnseignant = props => {
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
            Liste des enseignant
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Ajouter un enseignant
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Enseignants />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <CreateEnseignant />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ListEnseignant;
