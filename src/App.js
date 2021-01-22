import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import EntradaSalida  from './components/EntradaSalida'
import Login from './components/Login'
import Dashboard from './components/dashboard/Dashboard'
import Employes from './components/dashboard/Employes'
import Departments from './components/dashboard/Deparments'
import Users from './components/dashboard/Users'
import Reportes from './components/dashboard/Reportes'

function App() {
  return (
    <BrowserRouter>
  
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/entrada-salida" component={EntradaSalida} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/employes" component={Employes} />
          <Route exact path="/departments" component={Departments} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/reportes" component={Reportes} />
        </Switch>
      
    </BrowserRouter>
  );
}

export default App;
