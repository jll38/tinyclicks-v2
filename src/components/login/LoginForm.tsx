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

export default function LoginForm() {
  const otherAuth = false;
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  function handleSubmit(credentials: LoginFormValues) {
    console.log(credentials);
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
      {otherAuth && (
        <>
          <Divider label="or" labelPosition="center"></Divider>

          <Text ta={"center"} fw={500} c="dimmed">
            Login With
          </Text>
        </>
      )}
    </Box>
  );
}
