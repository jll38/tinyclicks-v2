import React from "react";
import { Image, Title, Text } from "@mantine/core";

export default function NotFound() {
  return (
    <main style={{ display: "grid", placeItems: "center", height: "85vh" }}>
      <div>
        <Image alt="sad robot 404" src={"/images/404.webp"} radius="lg" h={400} w="auto"></Image>
        <Title order={1} ta={"center"}>Page Not Found</Title>
      </div>
    </main>
  );
}
