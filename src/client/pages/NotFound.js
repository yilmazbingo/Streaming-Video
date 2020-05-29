import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => (
  <div>
    404
    <NavLink to="/" activeClassName="is-active" exact={true}>
      GO Home
    </NavLink>
  </div>
);

export default NotFound;
