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
import CreateAdmin from "./create_admin";
const Admin = props => (
  <tr>
    <th scope="row"> .</th>
    <td>{props.admin.username}</td>
    <td>{props.admin.nom}</td>
    <td>{props.admin.prenom}</td>
    <td>{props.admin.cin}</td>
    <td>{props.admin.post}</td>
    <td>
      <Button color="secondary" active>
        <Link to={"/edit-admin/" + props.admin._id}>edit</Link>
      </Button>
    </td>
    <td>
      <Button
        color="danger"
        onClick={() => {
          props.deleteAdmin(props.admin._id);
        }}
      >
        delete
      </Button>
    </td>
  </tr>
);

class Admins extends Component {
  constructor(props) {
    super(props);

    this.deleteAdmin = this.deleteAdmin.bind(this);

    this.state = { admin: [] };
  }

  componentDidMount() {
    axios
      .get("http://51.91.98.162:3013/admin/")
      .then(response => {
        this.setState({ admin: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteAdmin(id) {
    axios.delete("http://51.91.98.162:3013/admin/" + id).then(response => {
      console.log(response.data);
      alert("Student deleted!!");
    });

    this.setState({
      admin: this.state.admin.filter(el => el._id !== id)
    });
  }

  adminList() {
    return this.state.admin.map(currentadmin => {
      return (
        <Admin
          admin={currentadmin}
          deleteAdmin={this.deleteAdmin}
          key={currentadmin._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <br />
        <h3>Liste des admin</h3>
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
              <tbody>{this.adminList()}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const ListAdmin = props => {
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
            Liste des admin
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Ajouter un admin
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Admins />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <CreateAdmin />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ListAdmin;
