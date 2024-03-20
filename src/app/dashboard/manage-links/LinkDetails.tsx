"use client";
import React from "react";
import { Box, Title, Text, Button, Tooltip } from "@mantine/core";
import styles from "./managelinks.module.css";
import { useSession } from "next-auth/react";

export function LinkDetails({ selectedLink }: any) {
  const { data: session } = useSession();
  const [data, setData] = React.useState<any>();
  const [sourceCounts, setSourceCounts] = React.useState<any>();

  const [tooltip, setTooltip] = React.useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  const colors = ["#BCE7FD", "#C492B1", "#AF3B6E", "#21FA90"];

  const handleMouseEnter = (content: string) => (e: any) => {
    setTooltip({
      visible: true,
      content,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = (e: any) => {
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      x: e.clientX,
      y: e.clientY,
    }));
  };

  const handleMouseLeave = () => {
    setTooltip((prevTooltip) => ({
      ...prevTooltip,
      visible: false,
    }));
  };

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
              <div style={{margin: "20px 0"}}>
                <Title c={"gray.7"} order={3}>Traffic Sources</Title>
                <div className={styles.referrersBox}>
                  {
                    //@ts-ignore
                  sourceCounts.map((source, i) => (
                    <div
                      key={"color-" + i}
                      style={{
                        width: `${
                          (source._count / sourceCounts.length) * 100
                        }%`,
                        height: "100%",
                        backgroundColor: colors[i],
                      }}
                      onMouseEnter={handleMouseEnter(
                        `${source.source || "Unknown Origin"} - ${source._count} Clicks`
                      )}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                    </div>
                  ))}
                  {tooltip.visible && (
                    <div
                      style={{
                        position: "fixed",
                        left: tooltip.x + 10, // Offset from cursor
                        top: tooltip.y + 10,
                        backgroundColor: "white",
                        border: "1px solid black",
                        padding: "8px",
                        pointerEvents: "none", // Prevents the tooltip from interfering with mouse events
                      }}
                    >
                      {tooltip.content}
                    </div>
                  )}
                </div>
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
