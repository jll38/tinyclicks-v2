"use client";
import React from "react";
import { Paper, Title, Text, Box, Button } from "@mantine/core";
import { IoLink } from "react-icons/io5";
import { CgLoadbarSound } from "react-icons/cg";

import UnderConstruction from "@/components/shared/placeholder/UnderConstruction/UnderConstruction";
import { useSession } from "next-auth/react";

import styles from "./managelinks.module.css";

function Link() {
  return <div>Link</div>;
}

export default function Managelinks() {
  const { data: session } = useSession();

  const [data, setData] = React.useState<any>();

  const [links, setLinks] = React.useState<any>();
  const [collections, setCollections] = React.useState<any>();

  const [selectedLink, setSelectedLink] = React.useState<any>();

  React.useEffect(() => {
    //@ts-ignore
    if (session && session.user && session.user.id) {
      //@ts-ignore
      fetch(`/api/dashboard/get-links?usr=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setLinks(data.userLinks);
          setCollections(data.userCollections);
          setSelectedLink(data.userLinks[0] || null);
        });
    }
  }, [session]);

  return (
    <main
      style={{
        width: "90vw",
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {links && collections && (
        <>
          <Paper
            display={"flex"}
            radius={20}
            shadow={"sm"}
            style={{ width: "100%", maxHeight: "650px", overflow: "hidden" }}
          >
            <Box
              bg={"gray.2"}
              style={{
                width: "250px",
                overflow: "scroll",
              }}
            >
              {
                //@ts-ignore
                links.map((link, i) => {
                  return (
                    <button
                      style={{ width: "100%" }}
                      className={styles.linkButton}
                      key={`link-${i}`}
                      onClick={() => {
                        setSelectedLink(link);
                      }}
                    >
                      <div>{link.name}</div>
                      <div>
                        {link.clicks} <CgLoadbarSound />
                      </div>
                    </button>
                  );
                })
              }
            </Box>
            <Box p={"30px 60px 10px 60px"} w={"100%"}>
              {selectedLink ? (
                <>
                  <div>
                    <Title c={"gray.7"}>
                      {selectedLink.name || "undefined"}
                    </Title>
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
          </Paper>
        </>
      )}
    </main>
  );
}
