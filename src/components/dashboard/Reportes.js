import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "./components/Layout";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import ReportesDiasTrabajo from "./components/ReportesDiasTrabajo";
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

function Dashboard({ history }) {
  const classes = useStyles();
  useEffect(() => {
    if (getSesion() == null) {
      history.push("/");
    }
  });

  return (
    <div className={classes.root}>
      <Layout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ReportesDiasTrabajo />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
}

export default withRouter(Dashboard);
