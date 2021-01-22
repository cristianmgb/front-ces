import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Swal from "sweetalert2";
import Title from "./Title";
import API, { DEPARTMENTS, EMPLOYES } from "../../../api/api";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  bgButton: {
    backgroundColor: "#d2ac57",
    color: "white",
    alignContent: "center",
  },
  formControl: {
    width: "100%",
  },
}));

export default function RegisterUsers() {
  const classes = useStyles();
  const [employes, setEmployes] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    departamento: "",
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    const list = await API.get(DEPARTMENTS);
    setDepartments(list.data);
  };

  const changeText = (e) => {
    setEmployes({
      ...employes,
      [e.target.name]: e.target.value,
    });
  };

  const saveEmployes = async () => {
    if (
      employes.nombres === "" ||
      employes.apellidos === "" ||
      employes.identificacion === "" ||
      employes.departamento === ""
    ) {
      Swal.fire({
        icon: "error",
        text: "Debe llenar todos los campos",
      });
      return;
    }
    const data = {
      nombres: employes.nombres,
      apellidos: employes.apellidos,
      identificacion: employes.identificacion,
      departamento: parseInt(employes.departamento),
    };
    const res = await API.post(data, EMPLOYES);
    if (res.status === "OK") {
      Swal.fire({
        icon: "success",
        text: res.message,
      });
      setEmployes({
        nombres: "",
        apellidos: "",
        identificacion: "",
        departamento: "",
      });
    } else {
      Swal.fire({
        icon: "error",
        text: res.message,
      });
    }
  };

  return (
    <>
      <Title>Registrar Empelado</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nombres"
            name="nombres"
            label="Nombres"
            fullWidth
            value={employes.nombres}
            onChange={changeText}
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
            onChange={changeText}
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
            onChange={changeText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="departamento">Departamento *</InputLabel>
            <Select
              native
              value={employes.departamento}
              onChange={changeText}
              fullWidth
              inputProps={{
                name: "departamento",
                id: "departamento",
              }}
            >
              <option aria-label="None" value="" />
              {departments.map((depart) => {
                return (
                  <option value={depart.id} key={depart.id}>
                    {depart.nombre}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            className={classes.bgButton}
            onClick={saveEmployes}
          >
            Crear Departamento
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
