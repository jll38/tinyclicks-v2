import React from "react";
import UnderConstruction from "@/components/shared/placeholder/UnderConstruction/UnderConstruction";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth";

import { Paper, Box, Avatar, Title, Text } from "@mantine/core";

export default async function Settings() {
  const session = await getServerSession(authConfig);
  return (
    <main
      style={{
        width: "90vw",
        padding: "20px 10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        radius="20"
        shadow={"lg"}
        w={{ base: "80%", sm: "80%", md: "50%" }}
      >
        <Box
          p={"20px 10px"}
          w={"100%"}
          display="flex"
          style={{ alignItems: "center", flexDirection: "column" }}
        >
          {" "}
          <Avatar
            alt="User Profile Picture"
            size={"lg"}
            src={
              //@ts-ignore
              session.user?.image ||
              "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
          ></Avatar>
          {
            //@ts-ignore
            session?.user?.name
          }
          <Box w={"100%"}>
            <Title order={2} c="gray.7">
              Billing
            </Title>
            <Text>Free Plan</Text>
            
            <Title order={2} c="gray.7">
              Billing
            </Title>
            <Text>Free Plan</Text>
          </Box>
        </Box>
      </Paper>
    </main>
  );
}
