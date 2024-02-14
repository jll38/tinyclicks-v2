"use client";
import React from "react";
import { NavLink, Text, Button, Flex, Image, Tooltip } from "@mantine/core";
import { ActionIcon } from "@mantine/core";

export default function Navbar() {
  const navLinks = [
    {
      label: "Login",
      href: "/login",
    },
  ];
  return (
    <nav
      style={{
        display: "flex",
        height: "65px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 20px",
        borderBottom: "2px #64A0FF solid"
      }}
    >
      <Text id="nav-left" fw={600}>
        TinyClicks
      </Text>

      <Flex id="nav-right" gap={"20"} align="center">
        <Button component="a" variant="light" href="/login">
          Login
        </Button>
        <Button component="a" variant="filled" href="/register">
          Sign Up
        </Button>
        <Tooltip label="Portfolio">
          <ActionIcon
            variant={"filled"}
            aria-label="Portfolio Modal"
            component="a"
            href="https://jlechner.com"
            target={"_blank"}
          >
            <Image
              src={"https://avatars.githubusercontent.com/u/97925400?v=4"}
              fit="cover"
            ></Image>
          </ActionIcon>
        </Tooltip>
      </Flex>
    </nav>
  );
}
