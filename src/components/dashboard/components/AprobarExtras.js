import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Title from "./Title";
import API, { AUTORIZAR_EXTRAS } from "../../../api/api";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  bgButton: {
    backgroundColor: "#d2ac57",
    color: "white",
    alignContent: "center",
    width: "100%",
  },
}));

export default function AprobarExtras({ data, cancelarAprobacion }) {
  const classes = useStyles();
  const [employes, setEmployes] = useState({
    id_empleado: data.id_empleado,
    nombres: data?.nombres,
    apellidos: data?.apellidos,
    identificacion: data?.identificacion,
    departamento: data?.departamento,
    observacion: "",
  });

  const changeText = (e) => {
    setEmployes({
      ...employes,
      [e.target.name]: e.target.value,
    });
  };

  const autorizar = async () => {
    if (employes.observacion === "") {
      Swal.fire({
        icon: "error",
        text: "Debe escribir una observación",
      });
      return;
    }
    const data = {
      id_empleado: employes.id_empleado,
      observacion: employes.observacion,
    };
    const res = await API.post(data, AUTORIZAR_EXTRAS);
    if (res.status === "OK") {
      Swal.fire({
        icon: "success",
        text: res.message,
      });
      cancelarAprobacion()
    } else {
      Swal.fire({
        icon: "error",
        text: res.message,
      });
    }
  };

  return (
    <>
      <Title>Autorizar Horas Extras Empelado</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nombres"
            name="nombres"
            label="Nombres"
            fullWidth
            value={employes.nombres}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="apellidos"
            name="apellidos"
            label="Apellidos"
            fullWidth
            value={employes.apellidos}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="identificacion"
            name="identificacion"
            label="Identificación"
            fullWidth
            value={employes.identificacion}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="departamento"
            name="departamento"
            label="Departamento"
            fullWidth
            value={employes.departamento}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="observacion"
            name="observacion"
            label="Observaciones"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            fullWidth
            onChange={changeText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            className={classes.bgButton}
            onClick={autorizar}
          >
            Autorizar
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            className={classes.bgButton}
            onClick={() => cancelarAprobacion()}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
      <div className={classes.seeMore}>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link> */}
      </div>
    </>
  );
}
