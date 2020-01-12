import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Alert } from "reactstrap";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Gestion d'ecole "}
      <Link color="inherit" href="https://material-ui.com/">
        ...
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.props.conn();
    this.onSubmit = this.onSubmit.bind(this);
    this.OnChangeUserName = this.OnChangeUserName.bind(this);
    this.OnChangePassword = this.OnChangePassword.bind(this);

    this.state = {
      user: "",
      password: "",
      errors: false,
      msg: ""
    };
  }

  OnChangeUserName = e => {
    this.setState({
      username: e.target.value
    });
  };

  OnChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  handleChange(event) {
    this.setState({
      user: event.target.value
    });
  }
  onSignoutff = () => {
    this.props.mpy();
  };
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };
    if (this.state.username === "admin" && this.state.password === "admin") {
      window.location = "/Dash";
      alert("Welcome Admin !!");
    }
    console.log(user);
    axios.post("http://localhost:3013/admin/loginAdmin", user).then(res => {
      if (res.data.error) {
        window.location = "/Dash";
      } else {
        axios
          .post("http://localhost:3013/Enseignant/loginEnseignant", user)
          .then(res => {
            if (res.data.error) {
              window.location = "/Dash";
              alert("Welcome Prof !!");
            } else {
              this.setState({
                msg: res.data.msg
              });
              console.log(res);
              console.log(res.data.msg);
            }
          });
      }
    });
  }

  render() {
    const root = {
      height: "100vh"
    };
    const paper = {
      margin: 30,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    };
    const avatar = {
      margin: 20,
      backgroundColor: "secondary"
    };
    const form = {
      width: "30%", // Fix IE 11 issue.
      marginTop: 10
    };
    const submit = {
      margin: 10
    };

    return (
      <div>
        <Grid container component="main" style={root}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={6}
            square
          >
            <div style={paper}>
              <Avatar style={avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form onSubmit={this.onSubmit} style={form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.OnChangeUserName}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.OnChangePassword}
                />

                {this.state.msg === "" ? (
                  ""
                ) : (
                  <Alert color="danger">{this.state.msg}</Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
