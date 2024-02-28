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
  Anchor
} from "@mantine/core";

import { GoogleButton } from "../login/buttons/GoogleButton";
import { GithubIcon } from "@mantinex/dev-icons";
import { useForm } from "@mantine/form";

import { signIn } from "next-auth/react";
export default function RegisterForm() {
  const otherAuth = false;
  const registerForm = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      termsAccepted: false,
    },

    validate: {
      name: (value) => (value ? null : "Enter your name"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value ? null : "Enter your password"),
      termsAccepted: (value) => (value === true ? null : "You must accept the terms of service")
    },
  });

  async function handleSubmit(credentials: RegisterFormValues) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {});
  }

  interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    termsAccepted: boolean;
  }

  return (
    <Box maw={340} mx="auto" px={10} py={30}>
      <Title order={1} ta="center">
        TinyClicks
      </Title>
      <Text fw={500} ta="center">
        Welcome!
      </Text>

      <form
        onSubmit={registerForm.onSubmit((credentials) =>
          handleSubmit(credentials)
        )}
      >
        <TextInput
          label="Name"
          placeholder="John Doe"
          withAsterisk={true}
          {...registerForm.getInputProps("name")}
        ></TextInput>

        <TextInput
          label="Email"
          placeholder="your@email.com"
          withAsterisk={true}
          {...registerForm.getInputProps("email")}
        ></TextInput>

        <TextInput
          label="Password"
          type={"password"}
          placeholder="***********"
          withAsterisk={true}
          {...registerForm.getInputProps("password")}
        ></TextInput>

        <Checkbox
          label={
            <>
              I accept{" "}
              <Anchor href="/" target="_blank" inherit>
                terms and conditions
              </Anchor>
            </>
          }
          {...registerForm.getInputProps("termsAccepted")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" w={"100%"} variant="gradient">
            Create My Account
          </Button>
        </Group>
      </form>
      <Divider label="or" labelPosition="center"></Divider>

      <Text ta={"center"} fw={500} c="dimmed">
        Continue With
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
