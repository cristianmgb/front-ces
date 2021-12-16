import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Edit from "@material-ui/icons/EditAttributes";
import IconButton from "@material-ui/core/IconButton";
import Title from "./Title";
import API, { EN_TURNO } from "../../../api/api";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  edit: {
    marginLeft: 20,
  },
}));

export default function EnTurno({ handleExtras }) {
  const classes = useStyles();
  const [enTurno, setEnTurno] = useState([]);

  useEffect(() => {
    getEnTurno();
  }, []);

  const getEnTurno = async () => {
    const list = await API.get(EN_TURNO);
    setEnTurno(list.data);
  };

  return (
    <>
      <Title>Empleados en Turno</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Identificacion</TableCell>
            <TableCell>Fecha de Entrada</TableCell>
            <TableCell>Horas Extras</TableCell>
            <TableCell>Departamento</TableCell>
            <TableCell>Autorizar Extras</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enTurno.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{row.nombres}</TableCell>
              <TableCell>{row.apellidos}</TableCell>
              <TableCell>{row.identificacion}</TableCell>
              <TableCell>{row.entrada}</TableCell>
              <TableCell>{row.autoriza_extras === 0 ? "NO" : "SÍ"}</TableCell>
              <TableCell>{row.departamento}</TableCell>
              <TableCell>
                <IconButton
                  className={classes.edit}
                  onClick={() => handleExtras(row)}
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link> */}
      </div>
    </>
  );
}
