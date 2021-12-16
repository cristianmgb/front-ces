import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import Title from "./Title";
import API, { EMPLOYES, DELETE_EMPLOYES } from "../../../api/api";
import { fetchImage } from "../../../utils/ultil";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ListEmployes() {
  const classes = useStyles();
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    getEmployes();
  }, []);

  const getEmployes = async () => {
    const list = await API.get(EMPLOYES);
    setEmployes(list.data);
  };

  const deleteEmploye = async (id) => {
    const res = await API.post({ id }, DELETE_EMPLOYES);
    if (res.status === "OK") {
      getEmployes();
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
  };

  return (
    <>
      <Title>Empleados</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Identificacion</TableCell>
            <TableCell>Departamento</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employes.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{row.nombres}</TableCell>
              <TableCell>{row.apellidos}</TableCell>
              <TableCell>{row.identificacion}</TableCell>
              <TableCell>{row.departamento}</TableCell>
              <TableCell>
                {row.foto ? (
                  <img
                    src={fetchImage(row.foto)}
                    alt={row.nombres}
                    style={{ width: 50 }}
                  />
                ) : (
                  <p>No foto</p>
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => deleteEmploye(row.id)}>
                  <Delete />
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
