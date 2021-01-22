import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import md5 from "md5";
import Title from "./Title";
import API, { USERS } from "../../../api/api";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  bgButton: {
    backgroundColor: "#d2ac57",
    color: "white",
    alignContent: "center",
  },
}));

export default function RegisterUsers() {
  const classes = useStyles();
  const [users, setUsers] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
    password2: "",
  });

  const changeText = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const insertUsers = async () => {
    if (users.password !== users.password2) {
      Swal.fire({
        icon: "error",
        text: "Las contraseñas no coinciden",
      });
      return;
    }
    if (
      users.nombres === "" ||
      users.apellidos === "" ||
      users.correo === "" ||
      users.password === ""
    ) {
      Swal.fire({
        icon: "error",
        text: "Debe llenar todos los campos",
      });
      return;
    }
    const data = {
      nombres: users.nombres,
      apellidos: users.apellidos,
      correo: users.correo,
      password: md5(users.password),
    };
    const res = await API.post(data, USERS);
    if (res.status === "OK") {
      Swal.fire({
        icon: "success",
        text: res.message,
      });
      setUsers({
        nombres: "",
        apellidos: "",
        correo: "",
        password: "",
        password2: "",
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
      <Title>Registrar Usuarios</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nombres"
            name="nombres"
            label="Nombres"
            fullWidth
            value={users.nombres}
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
            value={users.apellidos}
            onChange={changeText}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="correo"
            name="correo"
            label="Correo electronico"
            fullWidth
            value={users.correo}
            onChange={changeText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Contraseña"
            fullWidth
            type="password"
            value={users.password}
            onChange={changeText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="password2"
            name="password2"
            label="Repita la contraseña"
            fullWidth
            type="password"
            value={users.password2}
            onChange={changeText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            className={classes.bgButton}
            onClick={insertUsers}
          >
            Crear Usuario
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
