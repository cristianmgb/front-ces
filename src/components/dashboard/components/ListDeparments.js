import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import API, { DEPARTMENTS } from "../../../api/api";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ListDepartments() {
  const classes = useStyles();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getEmployes();
  }, []);

  const getEmployes = async () => {
    const list = await API.get(DEPARTMENTS);
    setDepartments(list.data);
  };

  return (
    <>
      <Title>Departments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{row.nombre.toUpperCase()}</TableCell>
              <TableCell>{row.estado === 1 && "Activo"}</TableCell>
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
