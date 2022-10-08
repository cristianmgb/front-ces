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
// import * as faceapi from "face-api.js";
import API, { SALIDA_ENTRADA, VALIDATE_EMPLOYES } from "../api/api";
import logo from "../images/bacata.jpeg";
// import { fetchImage } from "../utils/ultil";
// import FaceDetections from "./FaceDetections";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Bacatá Tower Casino
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
    backgroundColor: "green",
    color: "white",
  },
  salida: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "red",
    color: "white",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function EntradaSalida({ history }) {
  // let countMatch = 0;
  // let countNoMatch = 0;
  const classes = useStyles();
  const [cedula, setCedula] = useState("");
  // const [nombres, setNombres] = useState("");
  // const [idEmpleado, setIdEmpleado] = useState("");
  // const [tipo, setTipo] = useState("");
  const [time, setTime] = useState("");
  // const [saludo, setSaludo] = useState("");
  // const [open, setOpen] = useState(false);
  // const [img, setImg] = useState(null);

  const f = moment().tz("America/Bogota");
  const fecha = f.format("DD/MM/YYYY");

  // useEffect(() => {
  //   const init = async () => {
  //     await faceapi.loadFaceLandmarkModel("./models");
  //     await faceapi.loadFaceRecognitionModel("./models");
  //     // await faceapi.loadFaceExpressionModel("./models");
  //     await faceapi.loadSsdMobilenetv1Model("./models");
  //   };
  //   init();
  // }, []);

  const changeText = (e) => {
    setCedula(e.target.value);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const validateEmployes = async () => {
    const data = {
      cedula: cedula,
    };
    return await API.post(data, VALIDATE_EMPLOYES);
  };

  const entrada = async (e) => {
    e.preventDefault();
    if (cedula !== "") {
      const res = await validateEmployes();

      setCedula("");
      if (res.status === "OK") {
        // const blobImg = fetchImage(res.data.foto);
        // setImg(blobImg);
        // setNombres(res.data.nombres);
        // setIdEmpleado(res.data.id_empleado);
        // setTipo("entrada");
        // setSaludo("Bienvenido");
        // handleOpen();

        registerInOut({
          id_empleado: res.data.id_empleado,
          tipo: "entrada",
          saludo: `Hola ${res.data.nombres}, Bienvenido!`,
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
      const res = await validateEmployes();

      setCedula("");
      if (res.status === "OK") {
        // const blobImg = fetchImage(res.data.foto);
        // setImg(blobImg);
        // setNombres(res.data.nombres);
        // setIdEmpleado(res.data.id_empleado);
        // setTipo("salida");
        // handleOpen();
        registerInOut({
          id_empleado: res.data.id_empleado,
          tipo: "salida",
          saludo: `Hola ${res.data.nombres}, hasta luego, ¡Muchas Gracias!`,
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

  const registerInOut = async (data) => {
    const res = await API.post(data, SALIDA_ENTRADA);
    if (res.status === "OK") {
      Swal.fire({
        icon: "success",
        text: `${data.saludo}`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        text: res.message,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };

  // const isMatch = (match) => {
  //   if (match) {
  //     countMatch = countMatch + 1;
  //     countMatch === 5 && registerInOut();
  //   } else {
  //     countNoMatch = countNoMatch + 1;
  //     countNoMatch === 5 &&
  //       Swal.fire({
  //         icon: "error",
  //         text: `No pudimos reconocerte, por favor intenta de nuevo`,
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           window.location.reload();
  //         }
  //       });
  //   }
  // };

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
        <img
          src={logo}
          alt="logo casino"
          style={{ width: 280, marginBottom: 15 }}
        />
        <div style={{ marginBottom: 30 }}>
          <Typography component="h3" variant="h5">
            {fecha}
          </Typography>
          <Typography component="h3" variant="h4">
            {time}
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
                autoFocus={true}
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
