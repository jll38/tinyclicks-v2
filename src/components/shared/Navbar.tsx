import React from "react";
import { NavLink, Text } from "@mantine/core";
export default function Navbar() {
    const navLinks = [{
        label: "Login",
        href: "/login"
    }];
  return (
    <nav
      style={{
        display: "flex",
        height: "50px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 20px"
      }}
    >
      <Text id="nav-left" fw={600}>TinyClicks</Text>
      <div id="nav-right">
        <NavLink href="/login" label="Login" />
      </div>
    </nav>
  );
}
