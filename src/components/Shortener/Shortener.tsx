"use client";
import React from "react";
import { Box, Button, TextInput, rem, Flex } from "@mantine/core";

import { LinkValidator } from "@/lib/validator";

export default function Shortener() {
  const userID = null; //Temporary value
  const [link, setLink] = React.useState<string>("");

  return (
    <Box style={{ maxWidth: 400 }}>
      <Flex
        mih={50}
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <TextInput
          leftSection={<div style={{ fontSize: 12 }}>https://</div>}
          leftSectionWidth={"50px"}
          type="text"
          placeholder="example.com"
          onChange={(e) => {
            setLink("https://" + e.target.value);
          }}
        ></TextInput>
        <Button
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
                if (response.status === 200) alert("Success!");
                else alert("Error!");
                return response.json();
              })
              .then((data) => {
                console.log(data);
              })
              .catch((error) => console.error("Error:", error));
          }}
        >
          Shorten
        </Button>
      </Flex>
    </Box>
  );
}
