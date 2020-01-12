import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dash from "./Dashboard";

import CreateElement from "../element/create_element";
import EditElement from "../element/edit_element";
import ListElement from "../element/list_element";

import CreateAdmin from "../admin/create_admin";
import EditAdmin from "../admin/edit_admin";
import ListAdmin from "../admin/list_admin";

import CreateEnseignant from "../enseignant/create_enseignant";
import EditEnseignant from "../enseignant/edit_enseignant";
import ListEnseignant from "../enseignant/list_enseignant";

import CreateEtudiant from "../etudiant/create_etudiant";
import EditEtudiant from "../etudiant/edit_etudiant";
import ListEtudiant from "../etudiant/list_etudiant";

import CreateFiliere from "../filiere/create_filiere";
import EditFiliere from "../filiere/edit_filiere";
import ListFiliere from "../filiere/list_filiere";

import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    window.location = "/";
  };
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>

            <IconButton color="inherit">
              <Badge badgeContent={""} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button onClick={logout}>LogOut</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/Dash" className="nav-link">
              Home
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/list-admin" className="nav-link">
              Administration
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/list-enseignant" className="nav-link">
              Enseignants
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/list-etudiant" className="nav-link">
              Etudiants
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/list-filiere" className="nav-link">
              Filiere
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/list-Element" className="nav-link">
              Elements et Modules
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/list-semestre" className="nav-link">
              Notes
            </Link>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid spacing={3}>
              <div>
                <Route path="/Dash" exact component={Dash} />
                <Route path="/create-element" component={CreateElement} />
                <Route path="/edit-element/:id" component={EditElement} />
                <Route path="/list-element" component={ListElement} />
                <Route path="/create-admin" component={CreateAdmin} />
                <Route path="/edit-admin/:id" component={EditAdmin} />
                <Route path="/list-admin" component={ListAdmin} />
                <Route path="/create-enseignant" component={CreateEnseignant} />
                <Route path="/edit-enseignant/:id" component={EditEnseignant} />
                <Route path="/list-enseignant" component={ListEnseignant} />
                <Route path="/create-etudiant" component={CreateEtudiant} />
                <Route path="/edit-etudiant/:id" component={EditEtudiant} />
                <Route path="/list-etudiant" component={ListEtudiant} />
                <Route path="/create-filiere" component={CreateFiliere} />
                <Route path="/edit-filiere/:id" component={EditFiliere} />
                <Route path="/list-filiere" component={ListFiliere} />
              </div>
            </Grid>
          </Container>
        </main>
      </div>
    </Router>
  );
}
