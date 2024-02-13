"use client";
import React from "react";
import Link from "next/link";
import { Box, Button, TextInput, rem, Text } from "@mantine/core";

import { LinkValidator } from "@/lib/validator";

export default function Shortener() {
  const userID = null; //Temporary value
  const [link, setLink] = React.useState<string>("");

  const [retrievedURL, setRetrievedURL] = React.useState<string>("");

  return (
    <div style={{ maxWidth: 400, position: "relative" }}>
        <TextInput
          label="Try it out!"
          leftSection={<div style={{ fontSize: 12 }}>https://</div>}
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
            setLink("https://" + e.target.value);
          }}
          style={{ overflow: "hidden" }}
        ></TextInput>
        <Text size="xs" c="dimmed">Create an account for more advanced features!</Text>
      {retrievedURL && (
        <Link style={{position: "absolute"}} href={retrievedURL}>Your Shortened Link is: {retrievedURL}</Link>
      )}
    </div>
  );
}
