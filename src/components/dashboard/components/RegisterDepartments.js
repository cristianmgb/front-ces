import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Title from "./Title";
import API, { DEPARTMENTS } from "../../../api/api";

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

export default function RegisterDepartments() {
  const classes = useStyles();
  const [departments, setDepartments] = useState("");

  const changeText = (e) => {
    setDepartments(e.target.value);
  };

  const insertUsers = async () => {
    
    if (departments === "") {
      Swal.fire({
        icon: "error",
        text: "Debe llenar todos los campos",
      });
      return;
    }
    const data = {
      departamento: departments,
    };
    const res = await API.post(data, DEPARTMENTS);
    if (res.status === "OK") {
      Swal.fire({
        icon: "success",
        text: res.message,
      });
      setDepartments("");
    } else {
      Swal.fire({
        icon: "error",
        text: res.message,
      });
    }
  };

  return (
    <>
      <Title>Registrar Departamento</Title>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="departamento"
            name="departamento"
            label="Departamento"
            fullWidth
            value={departments}
            onChange={changeText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            className={classes.bgButton}
            onClick={insertUsers}
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
