"use client";
import React from "react";
import Link from "next/link";
import { Box, Button, TextInput, rem, Text, Paper} from "@mantine/core";
import { DOMAIN } from "@/lib/constants";
import { notifications } from "@mantine/notifications";

import { LinkValidator } from "@/lib/validator";

export default function Shortener() {
  const userID = null; //Temporary value
  const [link, setLink] = React.useState<string>("");

  const [retrievedURL, setRetrievedURL] = React.useState<string>("");

  return (
    <Paper
    shadow={"md"}
    radius="10px"
      style={{
        maxWidth: 400,
        position: "relative",
    
        padding: "10px 15px",
        margin: 15
      }}
      
    >
      <TextInput
        label="Try it out!"
        leftSection={<div style={{ fontSize: 12 }}>http://</div>}
        leftSectionWidth={"50px"}
        rightSection={
          <Button
            size={"xs"}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            disabled={!LinkValidator.validate(link)}
            onClick={() => {
              fetch("api/url/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userID,
                  originalURL: link,
                  locked: false,
                }),
              })
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  setRetrievedURL(data.shortURL);
                  notifications.show({
                    title: "Link Shortened Successfully",
                    message: `Your link has been copied to your clipboard!\n ${retrievedURL}`,
                    autoClose: 5000,
                  });
                })
                .catch((error) => console.error("Error:", error));
            }}
          >
            Shorten
          </Button>
        }
        rightSectionWidth={"92"}
        type="text"
        placeholder="example.com"
        onChange={(e) => {
          setLink("http://" + e.target.value);
        }}
        style={{ overflow: "hidden" }}
      ></TextInput>
      <Text size="xs" c="dimmed">
        Create an account for more advanced features!
      </Text>
      {retrievedURL && (
        <Link style={{ position: "absolute" }} href={DOMAIN + retrievedURL}>
          Your Shortened Link is: {DOMAIN + retrievedURL}
        </Link>
      )}
    </Paper>
  );
}
