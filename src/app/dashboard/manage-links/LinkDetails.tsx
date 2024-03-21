"use client";
import React from "react";
import {
  Box,
  Title,
  Text,
  Button,
  Tooltip,
  Loader,
  Modal,
} from "@mantine/core";
import styles from "./managelinks.module.css";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import { PieChart } from "@mantine/charts";

export function LinkDetails({ selectedLink }: any) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const { data: session } = useSession();
  const [data, setData] = React.useState<any>();

  const [sourceCounts, setSourceCounts] = React.useState<any>();
  const [deviceCounts, setDeviceCounts] = React.useState<any>();
  const [browserCounts, setBrowserCounts] = React.useState<any>();

  const [opened, { open, close }] = useDisclosure(false);

  const [isEditable, setIsEditable] = React.useState<boolean>(false);

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
    setLoading(true);
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
          setBrowserCounts(data.browserSources);
          setDeviceCounts(data.deviceSources);
          setLoading(false);
        });
    }
  }, [selectedLink, session]);

  const saveChanges = () => {
    setIsEditable(false);
    //POST API
  };
  return (
    <Box p={"30px 60px 10px 60px"} w={"100%"}>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {selectedLink ? (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                {!isEditable ? (
                  <Title c={"gray.7"}>{selectedLink.name || "undefined"}</Title>
                ) : (
                  <Button
                    style={{ padding: 0, margin: 0 }}
                    variant={"transparent"}
                  >
                    <Title c={"gray.7"}>
                      {selectedLink.name || "undefined"}
                    </Title>
                  </Button>
                )}
                {!isEditable ? (
                  <Text c={"dimmed"}>{selectedLink.shortURL || 0}</Text>
                ) : (
                  <Button
                    style={{ padding: 0, margin: 0 }}
                    variant={"transparent"}
                  >
                    <Text c={"dimmed"}>{selectedLink.shortURL || 0}</Text>
                  </Button>
                )}
                <Text c={"dimmed"}>{selectedLink.clicks || 0} Clicks</Text>
                <div className="flex gap-4">
                  {isEditable ? (
                    <>
                      {" "}
                      <Button onClick={saveChanges} variant={"outline"} w="90">
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditable(false);
                        }}
                        variant={"outline"}
                        w="90"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsEditable(true);
                      }}
                      variant={"outline"}
                      w="90"
                    >
                      Edit
                    </Button>
                  )}
                </div>
                {sourceCounts ? (
                  <div style={{ margin: "20px 0", width: "100%" }}>
                    <Title c={"gray.7"} order={3}>
                      Traffic Sources
                    </Title>
                    {sourceCounts.length > 0 ? (
                      <>
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
                                  `${source.source || "Unknown Origin"} - ${
                                    source._count
                                  } Clicks`
                                )}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                              ></div>
                            ))
                          }
                          {tooltip.visible && (
                            <div
                              style={{
                                position: "fixed",
                                left: tooltip.x + 10, // Offset from cursor
                                top: tooltip.y + 10,
                                backgroundColor: "white",
                                border: "1px solid black",
                                padding: "8px",
                                zIndex: "50",
                                pointerEvents: "none", // Prevents the tooltip from interfering with mouse events
                              }}
                            >
                              {tooltip.content}
                            </div>
                          )}
                        </div>
                        <Modal
                          opened={opened}
                          onClose={close}
                          title="Traffic Sources"
                        >
                          <div
                            style={{
                              maxHeight: "200px",
                              overflow: "scroll",
                            }}
                          >
                            {
                              //@ts-ignore
                              sourceCounts.map((source, i) => (
                                <div>
                                  {source.source || "Unknown Origin"} -{" "}
                                  {source._count} Clicks
                                </div>
                              ))
                            }
                          </div>
                          <Button
                            style={{ margin: "10px 0" }}
                            variant={"outline"}
                            onClick={close}
                          >
                            Close
                          </Button>
                        </Modal>
                        <Button
                          style={{ margin: "10px 0" }}
                          variant={"outline"}
                          onClick={open}
                        >
                          More Details
                        </Button>
                      </>
                    ) : (
                      <>Link has not encountered any user traffic.</>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>No data to display</>
          )}
        </>
      )}
    </Box>
  );
}
