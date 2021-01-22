import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ children, to }) => {
  return (
    <NavLink
      exact
      to={to}
      activeStyle={{
        fontWeight: "bold",
        color: "#d2ac57",
        textDecoration: "none",
      }}
      style={{
        fontWeight: "bold",
        color: "inherit",
        textDecoration: "none",
      }}
      activeClassName="selected"
    >
      {children}
    </NavLink>
  );
};

export default Navigation;
