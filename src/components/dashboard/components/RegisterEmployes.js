import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import CloseIcon from "@material-ui/icons/Close";
// import Slide from "@material-ui/core/Slide";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import Delete from "@material-ui/icons/Delete";
import Swal from "sweetalert2";
// import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

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
  appBar: {
    position: "relative",
    backgroundColor: "#d2ac57",
    marginBottom: "20px",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function RegisterUsers() {
  const classes = useStyles();
  const [employes, setEmployes] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    departamento: "",
  });
  const [departments, setDepartments] = useState([]);
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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

  // function handleTakePhoto(dataUri) {
  //   // Do stuff with the photo...
  //   console.log("takePhoto", dataUri);
  //   setPhoto(dataUri);
  //   setTimeout(() => {
  //     handleClose();
  //   }, 1000);
  // }

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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              className={classes.bgButton}
              onClick={saveEmployes}
            >
              Crear Empleado
            </Button>
          </Grid>
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
