import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import md5 from 'md5';
import logo from "../images/millionaires.png";
import Copyright from "./dashboard/components/Copyright";
import api, { LOGIN } from "../api/api";
import { saveSesion, getSesion } from "../utils/ultil";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#d2ac57",
    color: 'white'
  },
  title: {
    marginBottom: 30,
    color: "#d2ac57",
  },
}));

function SignIn({ history }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (getSesion() != null) {
      history.push("/dashboard");
    }
  });

  const login = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password: md5(password),
    };
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        text: "No deje campos vacios!",
      });
      return;
    }
    const res = await api.post(data, LOGIN);
    if (res.status === "OK") {
      saveSesion(res.data);
      history.push("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        text: res.message,
      });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          src={logo}
          alt="logo casino"
          style={{ width: 100, marginBottom: 15 }}
        />
        <Typography component="h1" variant="h5" className={classes.title}>
          Control de Entra y Salida
        </Typography>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
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
            onChange={changeEmail}
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
            onChange={changePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignIn);
