"use client";
import React from "react";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Flex,
  Title,
  Text,
  Divider,
} from "@mantine/core";

import { useForm } from "@mantine/form";

import { signIn } from "next-auth/react";

import { navigate } from "@/lib/navigate";

import { GithubIcon } from "@mantinex/dev-icons";
import { GoogleButton } from "./buttons/GoogleButton";
import classes from "./SocialButtons.module.scss";

export default function LoginForm() {
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  async function handleSubmit(credentials: LoginFormValues) {
    const logInResponse = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (logInResponse && !logInResponse.error) {
      navigate("/dashboard");
    } else {
      console.log("Error", logInResponse);
    }
  }

  interface LoginFormValues {
    email: string;
    password: string;
  }

  return (
    <Box maw={340} mx="auto" px={10} py={30}>
      <Title order={1} ta="center">
        TinyClicks
      </Title>
      <Text fw={500} ta="center">
        Welcome Back!
      </Text>

      <form
        onSubmit={loginForm.onSubmit((credentials) =>
          handleSubmit(credentials)
        )}
      >
        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...loginForm.getInputProps("email")}
        ></TextInput>

        <TextInput
          label="Password"
          type={"password"}
          placeholder="***********"
          {...loginForm.getInputProps("password")}
        ></TextInput>

        <Checkbox label="Remember Me" />

        <Group justify="flex-end" mt="md">
          <Button type="submit" w={"100%"} variant="gradient">
            Log in
          </Button>
        </Group>
      </form>

      <Divider label="or" labelPosition="center"></Divider>

      <Text ta={"center"} fw={500} c="dimmed">
        Login With
      </Text>
      <Flex justify={"center"} gap={10}>
        <GoogleButton
          onClick={() => {
            signIn("google", { callbackUrl: "/dashboard" });
          }}
        >
          Google
        </GoogleButton>
        <Button
          leftSection={<GithubIcon style={{ width: "1rem", height: "1rem" }} />}
          bg={"#181a2c"}
          onClick={() => {
            signIn("github", { callbackUrl: "/dashboard" });
          }}
        >
          Github
        </Button>
      </Flex>
    </Box>
  );
}
