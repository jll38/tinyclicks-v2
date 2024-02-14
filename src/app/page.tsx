import Shortener from "@/components/Shortener/Shortener";
import { Title, Text, Flex, Button, Space, Image, Paper } from "@mantine/core";

import classes from "./globals.module.css";
import { IoAnalytics } from "react-icons/io5";

export default function Home() {
  const services = [
    {
      icon: <IoAnalytics />,
      title: "Detailed Analytics",
      description:
        "Receive a detailed demographic view of which links are being clicked by your audience.",
    },
    {
      icon: <IoAnalytics />,
      title: "Detailed Analytics",
      description:
        "Receive a detailed demographic view of which links are being clicked by your audience.",
    },
    {
      icon: <IoAnalytics />,
      title: "Detailed Analytics",
      description:
        "Receive a detailed demographic view of which links are being clicked by your audience.",
    },
  ];
  return (
    <main>
      <section style={{ display: "grid", placeItems: "center" }}>
        <div style={{ width: "1280px", height: "650px", position: "relative" }}>
          <Flex
            style={{ height: "100%", zIndex: 10 }}
            justify={{ md: "space-around", base: "center" }}
            align={"center"}
            direction={{ md: "row", base: "column" }}
            wrap="wrap"
            gap={{ md: "0", base: "5%" }}
          >
            <div style={{ width: "450px", zIndex: 10 }}>
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
                We offer a suite of tools that allow you to better understand
                your audience through the links they engage with. Sign up and
                gain access to see your audience today!
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
              <Image
                style={{ zIndex: -1 }}
                src={"/images/hero-image.webp"}
                alt=""
                h={500}
              ></Image>
            </div>
          </Flex>
        </div>
      </section>
      <section
        style={{
          padding: 20,
          height: "450px",
          background: "#ecf3fb",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Title c="blue.4" order={3}>
          - Our Services -
        </Title>
        <Flex direction={"row"} justify="space-between" maw={1000}>
          {services.map((service) => {
            return (
              <Paper
                shadow={"sm"}
                radius="15px"
                style={{
                  width: "270px",
                  height: "300px",
                  padding: "10px 20px",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: "1",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ display: "grid", placeItems: "center" }}>
                    <IoAnalytics size={"46px"} />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <Title ta="center" order={4}>
                      Detailed Analytics
                    </Title>
                    <Text c="dimmed" ta="center"></Text>
                  </div>
                </div>
              </Paper>
            );
          })}
        </Flex>
      </section>
    </main>
  );
}
