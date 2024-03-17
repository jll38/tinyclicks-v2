
"use client";
import React from "react";
import { Paper, Title, Text, Box, Button } from "@mantine/core";
import { IoLink } from "react-icons/io5";
import { CgLoadbarSound } from "react-icons/cg";

import UnderConstruction from "@/components/shared/placeholder/UnderConstruction/UnderConstruction";
import { useSession } from "next-auth/react";

import { LinkDetails } from "./LinkDetails";

import styles from "./managelinks.module.css";

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
            <LinkDetails selectedLink={selectedLink} />
          </Paper>
        </>
      )}
    </main>
  );
}
