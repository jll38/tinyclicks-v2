import React from 'react'
import { Image, Title, Text} from "@mantine/core"
export default function UnderConstruction() {
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
        <Image
          src={"/images/under-construction.webp"}
          radius="lg"
          h={400}
          w="auto"
        ></Image>
        <Title order={1}>Excuse Our Appearance</Title>
        <Text>Construction is Underway!</Text>
      </div>
  )
}
