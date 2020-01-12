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
import CreateFiliere from "./create_filiere";
const Filiere = props => (
  <tr>
    <th scope="row"> .</th>
    <td>{props.filiere.filiere}</td>
    <td>
      <Button color="secondary" active>
        <Link to={"/edit-filiere/" + props.filiere._id}>edit</Link>
      </Button>
    </td>
    <td>
      <Button
        color="danger"
        onClick={() => {
          props.deleteFiliere(props.filiere._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

class Filieres extends Component {
  constructor(props) {
    super(props);

    this.deleteFiliere = this.deleteFiliere.bind(this);

    this.state = { filiere: [] };
  }

  componentDidMount() {
    axios
      .get("http://51.91.98.162:3013/filiere/")
      .then(response => {
        this.setState({ filiere: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteFiliere(id) {
    axios
      .delete("http://51.91.98.162:3013/filiere/delete/" + id)
      .then(response => {
        alert("Fil Deleted !!");
      });

    this.setState({
      filiere: this.state.filiere.filter(el => el._id !== id)
    });
  }

  filiereList() {
    return this.state.filiere.map(currentfiliere => {
      return (
        <Filiere
          filiere={currentfiliere}
          deleteFiliere={this.deleteFiliere}
          key={currentfiliere._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <br />
        <h3>Liste des filieres</h3>
        <Row>
          <Col sm="1"></Col>
          <Col sm="10">
            <Table className="table">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Filiere</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>{this.filiereList()}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const ListFiliere = props => {
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
            Liste des filiere
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Ajouter un filiere
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Filieres />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <CreateFiliere />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ListFiliere;
