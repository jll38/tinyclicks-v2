import React from "react";
import { NavLink } from "@mantine/core";

import "./SideNav.module.css"

export default function SideNav() {
  return (
    <nav
      id="side-nav"
      style={{ width: "300px", borderRight: "1px solid", height: "100%"}}
    >
      <NavLink label="Test" style={{ padding: "10px 20px" }}></NavLink>
    </nav>
  );
}
