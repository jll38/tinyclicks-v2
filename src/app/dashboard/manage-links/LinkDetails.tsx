"use client";
import React from "react";
import { Box, Title, Text, Button } from "@mantine/core";
import styles from "./managelinks.module.css";
import { useSession } from "next-auth/react";

export function LinkDetails({ selectedLink }: any) {
  const { data: session } = useSession();
  const [data, setData] = React.useState<any>();
  const [sourceCounts, setSourceCounts] = React.useState<any>();

  const colors = ["#BCE7FD", "#C492B1", "#AF3B6E", "#21FA90"]
  React.useEffect(() => {
    console.log("Fetching traffic data for " + selectedLink.name);
    //@ts-ignore
    if (session && session.user && session.user.id) {
      fetch(
        //@ts-ignore
        `/api/dashboard/get-links/link?usr=${session.user.id}&link=${selectedLink.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSourceCounts(data.trafficSources);
        });
    }
  }, [selectedLink, session]);
  return (
    <Box p={"30px 60px 10px 60px"} w={"100%"}>
      {selectedLink ? (
        <>
          <div>
            <Title c={"gray.7"}>{selectedLink.name || "undefined"}</Title>
            <Text c={"dimmed"}>{selectedLink.shortURL || 0}</Text>
            <Text c={"dimmed"}>{selectedLink.clicks || 0} Clicks</Text>
            <div className="flex gap-4">
              <Button variant={"outline"} w="90">
                Edit
              </Button>
            </div>
            {sourceCounts ? (
              <div className={styles.referrersBox}>
                {
                  //@ts-ignore
                  sourceCounts.map((source, i) => {
                    return (
                      <div
                        key={"color-" + i}
                        style={{
                          width: `${(source._count/sourceCounts.length) * 100}%`,
                          height: "100%",
                          backgroundColor: colors[i],
                        }}
                      >{source.source || "Unknown"}</div>
                    );
                  })
                }
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>No data to display</>
      )}
    </Box>
  );
}
