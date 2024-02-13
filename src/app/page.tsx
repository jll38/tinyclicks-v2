import Image from "next/image";
import Shortener from "@/components/Shortener/Shortener";
import { Title, Text, Flex } from "@mantine/core";
export default function Home() {
  return (
    <main>
      <section style={{ height: "650px" }}>
        <Flex
          style={{ height: "100%", border: "1px solid"}}
          justify="space-around"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <div>
            <Text>Welcome to</Text>
            <Title order={1} style={{ lineHeight: "40px" }}>
              TinyClicks
            </Title>
            <Text>Streamline your digital presence in one click.</Text>
          </div>
          <div>
            <Shortener />
          </div>
        </Flex>
      </section>
    </main>
  );
}
