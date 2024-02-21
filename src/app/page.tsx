import { FlipCard } from "./../components/home/FlipCard";
import Shortener from "@/components/Shortener/Shortener";
import {
  Title,
  Text,
  Flex,
  Button,
  Space,
  Image,
  Paper,
  Box,
} from "@mantine/core";

import classes from "./globals.module.css";
import { IoAnalytics } from "react-icons/io5";
import { IconGlobe, IconLink } from "@tabler/icons-react";
import { navigate } from "@/lib/navigate";

export default function Home() {
  const serviceIconSize = 36;
  const services = [
    {
      icon: <IconLink size={serviceIconSize} />,
      title: "Link Shortening",
      description:
        "Create user-friendly shortcuts to your webpages social media accounts without long links.",
    },
    {
      icon: <IoAnalytics size={serviceIconSize} />,
      title: "Detailed Analytics",
      description:
        "Receive a detailed demographic view of which links are being clicked by your audience.",
    },
    {
      icon: <IconGlobe size={serviceIconSize} />,
      title: "Geographical Tagging",
      description:
        "Visualize link traffic by location through an intuitive heatmap throughout the globe.",
    },
  ];
  return (
    <main>
      <section style={{ display: "grid", placeItems: "center" }}>
        <Box
          w={{ base: "100%", md: 1000, lg: 1280 }}
          style={{ height: "650px", position: "relative" }}
        >
          <Flex
            style={{ height: "100%", zIndex: 10 }}
            justify={{ md: "space-around", base: "center", sm: "start" }}
            align={"center"}
            direction={{ md: "row", base: "column-reverse" }}
            wrap="wrap"
            gap={{ md: "0", base: "5%" }}
          >
            <Box style={{ zIndex: 10 }} w={{ md: 450, base: 350 }}>
              <Title
                order={1}
                style={{ textTransform: "uppercase" }}
                size={"4em"}
                fw={800}
                lh="1"
              >
                TinyClicks
              </Title>
              <Title
                order={2}
                style={{ textTransform: "uppercase" }}
                size={"1.75em"}
                fw={800}
                lh="1"
                c={"dimmed"}
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
                component="a"
                href="/register"
              >
                Get Started
              </Button>
            </Box>

            <div>
              <Image
                style={{ zIndex: -1 }}
                src={"/images/hero-image.webp"}
                alt=""
                h={{ base: 300, lg: 500 }}
              ></Image>
            </div>
          </Flex>
        </Box>
      </section>
      <section
        style={{
          padding: 20,
          minHeight: "450px",
          background: "#ecf3fb",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Title c="blue.4" order={3}>
          - Our Services -
        </Title>
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="center"
          align={"center"}
          gap={40}
          w={"100%"}
        >
          {services.map((service) => {
            return <FlipCard service={service} colors={{bg: "blue", color: "white"}} />;
          })}
        </Flex>
      </section>
    </main>
  );
}
