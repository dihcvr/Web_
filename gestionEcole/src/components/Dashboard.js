import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Title from "./Title";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Row, Col } from "reactstrap";
import PieChart from "react-minimal-pie-chart";

class Dash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filieres: [],
      enseignants: [],
      etudiants: [],
      admins: [],
      elements: [],
      cen: 0,
      cet: 0,
      cad: 0,
      cfil: 0,
      ch: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3013/filiere/")
      .then(response => {
        this.setState({
          filieres: response.data.map(user => user.filiere)
        });
        let cmp = 0;
        for (let i = 0; i < response.data.length; i++) {
          cmp++;
        }
        this.setState({
          cfil: cmp
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:3013/admin/")
      .then(response => {
        this.setState({
          admins: response.data.map(user => user.username)
        });

        let cmp = 0;
        for (let i = 0; i < response.data.length; i++) {
          cmp++;
        }
        this.setState({
          cad: cmp
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:3013/enseignant/")
      .then(response => {
        this.setState({
          enseignants: response.data.map(user => user.username)
        });
        let cmp = 0;
        for (let i = 0; i < response.data.length; i++) {
          cmp++;
        }
        this.setState({
          cen: cmp
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:3013/etudiant/")
      .then(response => {
        this.setState({
          etudiants: response.data
        });
        console.log(this.state.etudiants);
        let cmp = 0;
        for (let i = 0; i < response.data.length; i++) {
          cmp++;
        }
        this.setState({
          cet: cmp
        });
        let title,
          value = 0,
          color;
        for (let i = 0; i < response.data.length; i++) {
          title = this.data.filiere;
          for (let j = 0; j < this.state.etudiants; j++) {
            if (response.data.filiere === this.state.etudiants.filiere) {
              value = value + 1;
              color = "#E3862" + j;
            }
          }
          this.state.etudiants.push({ title, value, color });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  preventDefault(event) {
    event.preventDefault();
  }
  render() {
    const depositContext = {
      flex: 1,
      fontSize: 20,
      color: "textSecondary"
    };
    const paper = {
      padding: 20,
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      height: 120
    };

    return (
      <div>
        <Row>
          <Col sm="3">
            <Paper style={paper}>
              <Title>Administrateur</Title>
              <Typography component="p" variant="h4">
                {this.state.cad}
                {"  "}
                <span style={depositContext}>admins </span>
              </Typography>
            </Paper>
          </Col>
          <Col sm="3">
            <Paper style={paper}>
              <Title>Enseignant</Title>
              <Typography component="p" variant="h4">
                {this.state.cen}
                {"  "}
                <span style={depositContext}>enseignants </span>
              </Typography>
            </Paper>
          </Col>
          <Col sm="3">
            <Paper style={paper}>
              <Title>Etudiant</Title>
              <Typography component="p" variant="h4">
                {this.state.cet}
                {"  "}
                <span style={depositContext}>etudiants </span>
              </Typography>
            </Paper>
          </Col>
          <Col sm="3">
            <Paper style={paper}>
              <Title>Filiere</Title>
              <Typography component="p" variant="h4">
                {this.state.cfil}
                {"  "}
                <span style={depositContext}>filieres </span>
              </Typography>
            </Paper>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <br />
            <br />
          </Col>

          <Col lg="7">
            <div>
              <span>Statistiques sur les utilisateurs (chart)</span>
              <PieChart
                animate={false}
                animationDuration={500}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                label
                labelPosition={112}
                labelStyle={{
                  fontFamily: "sans-serif",
                  fontSize: "5px"
                }}
                lengthAngle={360}
                lineWidth={100}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={0}
                radius={42}
                rounded={false}
                startAngle={0}
                viewBoxSize={[100, 100]}
                data={[
                  {
                    color: "#E38627",
                    title: "Etudiants",
                    value: this.state.cet
                  },
                  {
                    color: "#C13C37",
                    title: "Enseignants",
                    value: this.state.cen
                  },
                  {
                    color: "#6A2135",
                    title: "Administrateur",
                    value: this.state.cad
                  },
                  {
                    color: "#C20527",
                    title: "Filieres",
                    value: this.state.cfil
                  }
                ]}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dash;
