import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Swal from "sweetalert2";
import ReactExport from "react-export-excel";

import Title from "./Title";
import API, { REPORTE } from "../../../api/api";
import { formatDate } from "../../../utils/ultil";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  bgButton: {
    backgroundColor: "#d2ac57",
    color: "white",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 10,
    marginTop: 30
  },
  identificacion: {
    marginTop: 16
  },
  bgCaledar: {
    backgroundColor: "#d2ac57",
  }
}));

export default function RegisterDepartments() {
  const classes = useStyles();
  const [identificacion, setIdentificacion] = useState("");
  const [selectedDateInit, setSelectedDateInit] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
  const [reporte, setReporte] = useState([]);

  const changeText = (e) => {
    setIdentificacion(e.target.value);
  };
  const handleDateChangeInit = (date) => {
    setSelectedDateInit(date);
  };
  const handleDateChangeEnd = (date) => {
    setSelectedDateEnd(date);
  };

  const limpiar = () => {
    setReporte([]);
  };

  const report = async () => {
    if (formatDate(selectedDateInit) > formatDate(selectedDateEnd)) {
      Swal.fire({
        icon: "error",
        text: "Las fecha inicial no debe ser mayor a la final!",
      });
      return;
    }
    const data = {
      identificacion,
      fecha_inicial: formatDate(selectedDateInit),
      fecha_final: formatDate(selectedDateEnd),
    };
    const res = await API.post(data, REPORTE);
    if (res.status === "OK") {
      console.log(res);
      setReporte(res.data);
    } else {
      Swal.fire({
        icon: "error",
        text: res.message,
      });
    }
  };

  return (
    <>
      <Title>Reporte días trabajados</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="fecha-inicio"
              label="Fecha inicio"
              format="dd/MM/yyyy"
              value={selectedDateInit}
              onChange={handleDateChangeInit}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="fecha-fin"
              label="Fecha final"
              format="dd/MM/yyyy"
              value={selectedDateEnd}
              onChange={handleDateChangeEnd}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            fullWidth
            id="identificacion"
            name="identificacion"
            label="Identificación"
            value={identificacion}
            type="number"
            onChange={changeText}
            className={classes.identificacion}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            className={classes.bgButton}
            onClick={report}
          >
            Buscar
          </Button>
          <Button
            variant="contained"
            className={classes.bgButton}
            onClick={limpiar}
          >
            Limpiar
          </Button>
        </Grid>
        {reporte.length > 0 && (
          <Grid item xs={12}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <ExcelFile
                  filename={`reporte_del_${formatDate(selectedDateInit)}_al_${formatDate(selectedDateEnd)}`}
                  element={
                    <Button variant="contained" className={classes.bgButton}>
                      Descargar Reporte
                    </Button>
                  }
                >
                  <ExcelSheet data={reporte} name="Reporte_horas">
                    <ExcelColumn
                      label="Identificacion"
                      value="identificacion"
                    />
                    <ExcelColumn label="Nombres" value="nombres" />
                    <ExcelColumn label="Apellidos" value="apellidos" />
                    <ExcelColumn label="Fecha Entrada" value="entrada" />
                    <ExcelColumn label="Fecha Salida" value="salida" />
                    <ExcelColumn
                      label="Horas Trabajadas"
                      value="horas_ordinarias"
                    />
                    <ExcelColumn label="Horas Extras" value="horas_extras" />
                    <ExcelColumn label="Observaciones" value="observaciones" />
                  </ExcelSheet>
                </ExcelFile>
              </Grid>
            </Grid>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Identificacion</TableCell>
                  <TableCell>Nombres</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>F. Entrada</TableCell>
                  <TableCell>F. Salida</TableCell>
                  <TableCell>Horas Trabajadas</TableCell>
                  <TableCell>Horas Extras</TableCell>
                  <TableCell>Observaciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reporte.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.identificacion}</TableCell>
                    <TableCell>{row.nombres}</TableCell>
                    <TableCell>{row.apellidos}</TableCell>
                    <TableCell>{row.entrada}</TableCell>
                    <TableCell>{row.salida}</TableCell>
                    <TableCell>{row.horas_ordinarias}</TableCell>
                    <TableCell>{row.horas_extras}</TableCell>
                    <TableCell>{row.observaciones}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        )}
      </Grid>
      <div className={classes.seeMore}>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link> */}
      </div>
    </>
  );
}
