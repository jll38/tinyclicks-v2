"use client";
import React from "react";
import { Box, Title, Text, Button } from "@mantine/core";
import styles from "./managelinks.module.css";

export function LinkDetails({ selectedLink }: any) {
  React.useEffect(() => {
    console.log("Fetching traffic data for " + selectedLink.name);
  }, [selectedLink]);
  return (
    <Box p={"30px 60px 10px 60px"} w={"100%"}>
      {selectedLink ? (
        <>
          <div>
            <Title c={"gray.7"}>{selectedLink.name || "undefined"}</Title>
            <Text c={"dimmed"}>{selectedLink.clicks || 0} Clicks</Text>
            <div className="flex gap-4">
              <Button variant={"outline"} w="90">
                Edit
              </Button>
            </div>
            <div className={styles.referrersBox}>
              <div
                style={{
                  width: "30%",
                  height: "100%",
                  backgroundColor: "blue",
                }}
              ></div>
              <div
                style={{
                  width: "20%",
                  height: "100%",
                  backgroundColor: "red",
                }}
              ></div>
              <div
                style={{
                  width: "10%",
                  height: "100%",
                  backgroundColor: "pink",
                }}
              ></div>
            </div>
          </div>
        </>
      ) : (
        <>No data to display</>
      )}
    </Box>
  );
}
