"use client";
import React from "react";
import Link from "next/link";
import {
  NavLink,
  Text,
  Button,
  Flex,
  Image,
  Tooltip,
  Menu,
  Divider
} from "@mantine/core";
import { ActionIcon, Skeleton } from "@mantine/core";


import { useSession, signIn, signOut } from "next-auth/react";

import { Avatar } from '@mantine/core';
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

import { navigate } from "@/lib/navigate";

export default function Navbar() {
  const { data: session } = useSession();

  const [sessionLoading, setSessionLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (session !== undefined) {
      setSessionLoading(false);
    }
  }, [session]);

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
      <Button
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
            <Menu
              transitionProps={{
                transition: "scale",
                duration: 150,
              }}
            >
              <Menu.Target>
                <Button variant={"transparent"}>
                  <FaUser size={"20px"} color="black" />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component="a" href="/profile" disabled>
                  <Flex justify={"start"} align="center" gap={6}>
                    <Avatar alt="User Profile Picture" src={session.user?.image}></Avatar>
                    <div>Profile</div>
                  </Flex>
                </Menu.Item>
                <Divider/>
                <Menu.Item component="a" href="/dashboard">
                  <Flex justify={"start"} align="center" gap={6}>
                    <MdDashboard size={20} />
                    Dashboard
                  </Flex>
                </Menu.Item>
                <Menu.Item
                  component="button"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <Flex justify={"start"} align="center" gap={6}>
                    <PiSignOutBold size={20} />
                    Sign Out
                  </Flex>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        ) : (
          <>
            {sessionLoading ? (
              <>
                <Skeleton w={60} h={40}></Skeleton>
                <Skeleton w={60} h={40}></Skeleton>
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
          </>
        )}
        {sessionLoading ? (
          <Skeleton w={30} h={30}></Skeleton>
        ) : (
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
        )}
      </Flex>
    </nav>
  );
}
