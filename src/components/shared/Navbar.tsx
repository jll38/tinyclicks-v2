"use client";
import React from "react";
import Link from "next/link";
import { NavLink, Text, Button, Flex, Image, Tooltip } from "@mantine/core";
import { ActionIcon } from "@mantine/core";

import { useSession, signIn, signOut } from "next-auth/react";

import { navigate } from "@/lib/navigate";

export default function Navbar() {
  const { data: session } = useSession();

  const [sessionLoading, setSessionLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (session !== undefined) {
      setSessionLoading(false);
    }
  }, [session]);

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
        borderBottom: "2px #64A0FF solid",
      }}
    >
      {!sessionLoading && <><Button
        variant={"transparent"}
        c="black"
        onClick={() => {
          navigate("/");
        }}
      >
        <Text id="nav-left" fw={600}>
          TinyClicks
        </Text>
      </Button>

      <Flex id="nav-right" gap={"20"} align="center">
        {session ? (
          <>
            <div>{session?.user?.name}</div>
            <Button
              component="a"
              variant="transparent"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Button>
            <Button
              component="a"
              variant="transparent"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              component="a"
              variant="light"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              component="a"
              variant="filled"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </Button>
          </>
        )}
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
      </>}
    </nav>
  );
}
