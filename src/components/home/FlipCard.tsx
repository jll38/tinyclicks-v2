import React, { ReactNode } from "react";
import { Paper, Title, Text, Box, Center } from "@mantine/core";
import { IoAnalytics } from "react-icons/io5";

interface IFlipCardProps {
  service: {
    icon: ReactNode;
    title: string;
    description: string;
  };
  colors: {
    bg: string;
    color: string;
  };
}
export function FlipCard({
  service,
  colors = {
    bg: "#4285F4",
    color: "white",
  },
}: IFlipCardProps) {
  return (
    <Paper
      shadow={"sm"}
      radius="15px"
      py={20}
      px={8}
      w={{md: 240}}
      maw={400}
      style={{
        height: "300px",
        flexShrink: "1",
        flexWrap: "wrap",
      }}
    >
      <Center h="90%">
        <div>
          <Box
            id="flipcard-header"
            h={80}
            style={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <div
                style={{
                  background: colors.bg,
                  borderRadius: 40,
                  height: "50px",
                  width: "50px",
                  position: "relative",
                  display: "grid",
                  placeItems: "center",
                  color: colors.color,
                }}
              >
                {service.icon}
              </div>
            </div>
          </Box>
          <div>
            <Title ta="center" order={4}>
              {service.title}
            </Title>
            <Text c="dimmed" ta="center" style={{marginTop: 5}}>
              {service.description}
            </Text>
          </div>
        </div>
      </Center>
    </Paper>
  );
}
