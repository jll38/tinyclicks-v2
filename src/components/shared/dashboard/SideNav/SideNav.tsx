import React from "react";
import { NavLink } from "@mantine/core";

import classes from "./SideNav.module.css"

export default function SideNav() {
  return (
    <nav
    className={classes.sideNav}
    >
      <NavLink label="Test" style={{ padding: "10px 20px" }}></NavLink>
    </nav>
  );
}
