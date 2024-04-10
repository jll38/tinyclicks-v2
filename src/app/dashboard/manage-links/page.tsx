"use client";
import React from "react";
import { Paper, Title, Text, Box, Button } from "@mantine/core";
import { IoMenu } from "react-icons/io5"; // Assuming you're using IoMenu for the hamburger icon
import { CgLoadbarSound } from "react-icons/cg";
import UnderConstruction from "@/components/shared/placeholder/UnderConstruction/UnderConstruction";
import { useSession } from "next-auth/react";
import { LinkDetails } from "./LinkDetails";
import { isMobile } from "react-device-detect";
import styles from "./managelinks.module.css";

export default function Managelinks() {
  const { data: session } = useSession();
  const [data, setData] = React.useState<any>();
  const [links, setLinks] = React.useState<any>();
  const [collections, setCollections] = React.useState<any>();
  const [selectedLink, setSelectedLink] = React.useState<any>();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(!isMobile); // Sidebar open by default on desktop

  React.useEffect(() => {
    console.log(isMobile)
    if (session && session.user && 
      //@ts-ignore
      session.user.id) {
      fetch(`/api/dashboard/get-links?usr=${
        //@ts-ignore
        session.user.id}`)
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
      {isMobile && (
        <Button
          variant="subtle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ marginBottom: 10 }}
        >
          <IoMenu size={24} />
        </Button>
      )}
      {links && collections && (
        <>
          <Paper
            display={"flex"}
            radius={20}
            shadow={"sm"}
            style={{ width: "100%", maxHeight: "650px", overflow: "hidden" }}
          >
            <Box
              className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`} // Use these classes to control visibility and transition
              bg={"gray.2"}
              style={{
                width: "250px",
                overflow: "scroll",
                transition: "transform 0.3s ease", // Smooth transition for sidebar
                transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // Move sidebar in/out
              }}
            >
              {links.map((
                //@ts-ignore
                link, i) => (
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
              ))}
            </Box>
            <LinkDetails selectedLink={selectedLink} />
          </Paper>
        </>
      )}
    </main>
  );
}
