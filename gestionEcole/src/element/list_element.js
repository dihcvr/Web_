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
import CreateElement from "./create_element";
const Element = props => (
  <tr>
    <th scope="row"> .</th>
    <td>{props.element.element}</td>
    <td>{props.element.cof_element}</td>
    <td>{props.element.cof_ds}</td>
    <td>{props.element.cof_tp}</td>
    <td>{props.element.cof_exam}</td>
    <td>{props.element.username}</td>
    <td>{props.element.filiere}</td>

    <td>
      <Button color="secondary" active>
        <Link to={"/edit-element/" + props.element._id}>edit</Link>
      </Button>
    </td>
    <td>
      <Button
        color="danger"
        onClick={() => {
          props.deleteElement(props.element._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

class Elements extends Component {
  constructor(props) {
    super(props);

    this.deleteElement = this.deleteElement.bind(this);

    this.state = { element: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3013/element/")
      .then(response => {
        this.setState({ element: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteElement(id) {
    axios
      .delete("http://localhost:3013/element/delete/" + id)
      .then(response => {
        alert("Element Deleted !!");
      });

    this.setState({
      element: this.state.element.filter(el => el._id !== id)
    });
  }

  elementList() {
    return this.state.element.map(currentelement => {
      return (
        <Element
          element={currentelement}
          deleteElement={this.deleteElement}
          key={currentelement._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <br />
        <h3>Liste des Elements</h3>
        <Row>
          <Col sm="1"></Col>
          <Col sm="10">
            <Table className="table">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Nom de l'element</th>
                  <th>cof_element</th>
                  <th>cof_ds</th>
                  <th>cof_tp</th>
                  <th>cof_exam</th>
                  <th>Enseignant</th>
                  <th>filiere</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>{this.elementList()}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const ListElement = props => {
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
            Liste des elements
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Ajouter un element
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Elements />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <CreateElement />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ListElement;
