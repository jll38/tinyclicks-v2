import Image from "next/image";
import Shortener from "@/components/Shortener/Shortener";
import { Title, Text, Flex, Button, Space } from "@mantine/core";

import classes from "./globals.module.css";

export default function Home() {
  return (
    <main>
      <section style={{ height: "650px" }}>
        <Flex
          style={{ height: "100%", border: "1px solid" }}
          justify={{ md: "space-around", base: "center" }}
          align={"center"}
          direction={{ md: "row", base: "column" }}
          wrap="wrap"
          gap={{ md: "0", base: "5%" }}
        >
          <div style={{ width: "450px" }}>
            <Title
              order={1}
              style={{ textTransform: "uppercase" }}
              size="40"
              fw={800}
              lh="1"
            >
              Streamline your <span>digital presence</span> in{" "}
              <span className={classes.textGradient}>one click</span>
            </Title>
            <hr />
            <Text c="dimmed">
              We offer a suite of tools that allow you to better understand your
              audience through the links they engage with. Sign up and gain
              access to see your audience today!
            </Text>

            <Button
              radius="lg"
              size="md"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              style={{ marginTop: "10px" }}
            >
              Get Started
            </Button>
          </div>
          <div>
            <Shortener />
          </div>
        </Flex>
      </section>
    </main>
  );
}
