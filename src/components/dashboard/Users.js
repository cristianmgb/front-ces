import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "./components/Layout";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import ListUsers from "./components/ListUsers";
import RegisterUsers from "./components/RegisterUsers";
import { getSesion } from "../../utils/ultil";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bgButton: {
    backgroundColor: "#d2ac57",
    color: "white",
  },
}));

function Users({ history }) {
  const classes = useStyles();
  const [isRegister, setIsRegister] = useState(false);
  useEffect(() => {
    if (getSesion() == null) {
      history.push("/");
    }
  });
  const showListUsers = () => {
    setIsRegister(false);
  };
  const showRegisterUsers = () => {
    setIsRegister(true);
  };
  return (
    <div className={classes.root}>
      <Layout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.button}>
              <Button
                variant="contained"
                className={classes.bgButton}
                onClick={() => showListUsers()}
              >
                Mostrar Usuarios
              </Button>
              <Button
                variant="contained"
                className={classes.bgButton}
                onClick={() => showRegisterUsers()}
              >
                Registrar Usuarios
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {!isRegister ? <ListUsers /> : <RegisterUsers />}
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
}

export default withRouter(Users);
