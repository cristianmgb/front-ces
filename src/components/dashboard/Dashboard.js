import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import Layout from "./components/Layout";
import EnTurno from "./components/EnTurno";
import AprobarExtras from "./components/AprobarExtras";
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
}));

function Dashboard({ history }) {
  const classes = useStyles();
  const [isRegister, setIsRegister] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (getSesion() == null) {
      history.push("/");
    }
  });
  const showExtras = () => {
    setIsRegister(true);
  };
  const hideExtras = () => {
    setIsRegister(false);
  };

  const handleExtras = (data) => {
    setData(data);
    showExtras();
  };

  const handleCancel = () => {
    hideExtras();
  };

  return (
    <div className={classes.root}>
      <Layout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {!isRegister ? (
                <EnTurno handleExtras={handleExtras} />
              ) : (
                <AprobarExtras cancelarAprobacion={handleCancel} data={data} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
}

export default withRouter(Dashboard);
