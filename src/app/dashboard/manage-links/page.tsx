"use client";
import React from "react";
import { Paper, Title, Text } from "@mantine/core";
import UnderConstruction from "@/components/shared/placeholder/UnderConstruction/UnderConstruction";
import { useSession } from "next-auth/react";

function Link() {
  return <div>Link</div>;
}

export default function Managelinks() {
  const { data: session } = useSession();

  const [data, setData] = React.useState<any>()

  React.useEffect(() => {
    //@ts-ignore
    if (session && session.user && session.user.id) {
      //@ts-ignore
      fetch(`/api/dashboard/get-links?usr=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data.data.userLinks);
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
      {data && (
        <>
          <Paper
            radius={20}
            shadow={"sm"}
            style={{ padding: 10, width: "100%" }}
          >
            <Title>Links</Title>

            {
              //@ts-ignore
              data.data.userLinks.map((link, i) => {
                return <div key={`link-${i}`}>{link.name}</div>;
              })
            }
          </Paper>
          <Paper
            radius={20}
            shadow={"sm"}
            style={{ padding: 10, width: "100%" }}
          >
            <Title>Collection</Title>
          </Paper>
        </>
      )}
    </main>
  );
}
