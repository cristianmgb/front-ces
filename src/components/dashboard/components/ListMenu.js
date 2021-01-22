import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import Domain from "@material-ui/icons/Domain";
import ExitToApp from "@material-ui/icons/ExitToApp";
import GroupAdd from "@material-ui/icons/GroupAdd";
import BarChartIcon from "@material-ui/icons/BarChart";
import Navigation from "./Navigation";

export const mainListItems = (
  <div>
    <Navigation to="/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="En Turno" />
      </ListItem>
    </Navigation>
    <Navigation to="/employes">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Empleados" />
      </ListItem>
    </Navigation>
    <Navigation to="/departments">
      <ListItem button>
        <ListItemIcon>
          <Domain />
        </ListItemIcon>
        <ListItemText primary="Departamentos" />
      </ListItem>
    </Navigation>
    <Navigation to="/reportes">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reportes" />
      </ListItem>
    </Navigation>
  </div>
);

export const SecondaryListItems = ({ logout }) => {
  return (
    <div>
      <ListSubheader inset>Configurations</ListSubheader>
      <Navigation to="/users">
        <ListItem button>
          <ListItemIcon>
            <GroupAdd />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
      </Navigation>
      <ListItem
        button
        onClick={() => {
          logout();
        }}
      >
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItem>
    </div>
  );
};
