import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import API, { SALIDA_ENTRADA } from "../api/api";
import logo from "../images/millionaires.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Millionaires Casino
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    marginTop: theme.spacing(3),
  },
  entrada: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'green',
    color: 'white'
  },
  salida: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'red',
    color: 'white'
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function EntradaSalida() {
  const classes = useStyles();
  const [cedula, setCedula] = useState("");
  const [time, setTime] = useState("");

  const f = moment().tz("America/Bogota");
  const fecha = f.format("DD/MM/YYYY");

  const changeText = (e) => {
    setCedula(e.target.value);
  };

  const registerInOut = async (tipo) => {
    const data = {
      cedula: cedula,
      tipo: tipo,
    };
    return await API.post(data, SALIDA_ENTRADA);
  };

  const entrada = async (e) => {
    e.preventDefault();
    if (cedula !== "") {
      const res = await registerInOut("entrada");
      setCedula("");
      if (res.status === "OK") {
        Swal.fire({
          icon: "success",
          text: res.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: res.message,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Debe digitar la cédula!",
      });
    }
  };
  const salida = async (e) => {
    e.preventDefault();
    if (cedula !== "") {
      const res = await registerInOut("salida");
      setCedula("");
      if (res.status === "OK") {
        Swal.fire({
          icon: "success",
          text: res.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: res.message,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Debe digitar la cédula!",
      });
    }
  };

  function fechaHora() {
    const f = moment().tz("America/Bogota");
    const fecha = f.format("HH:mm:ss");
    return fecha;
  }

  setInterval(() => {
    setTime(fechaHora());
  }, 1000);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="logo casino" style={{ width: 100, marginBottom: 15 }} />
        <div style={{marginBottom: 30}}>
          <Typography component="h3" variant="h5">
            {fecha} {time}
          </Typography>
        </div>
        <Typography component="h1" variant="h5">
          Control de Entrada y Salida
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cedula"
                label="Cédula"
                type="number"
                id="cedula"
                autoComplete="current-password"
                value={cedula}
                onChange={changeText}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.entrada}
            onClick={entrada}
          >
            Entrada
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.salida}
            onClick={salida}
          >
            Salida
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
