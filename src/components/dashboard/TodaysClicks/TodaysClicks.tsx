import { Paper, Title, Text, Skeleton } from "@mantine/core";
import React from "react";

import { TIME_ZONE } from "@/lib/constants";
import { useSession } from "next-auth/react";
export default function TodaysClicks() {
  const [data, setData] = React.useState<any>(null);
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session?.user !== undefined) {
      
      fetch(
        `api/dashboard?usr=${
          //@ts-ignore
          session!.user!.id
        }&operation=todays-clicks&timeZone=${TIME_ZONE}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData.data);
        });
    }
  }, [session]);

  return (
    <>
      {!data && <Skeleton w={"100%"} h={"105px"} radius={20} />}
      {data && (
        <Paper
          style={{
            width: "100%",
            height: "105px",
            padding: 5,
            display: "grid",
            placeItems: "center",
          }}
          radius={20}
          shadow={"md"}
          bg={"cyan.3"}
        >
          <div>
            <Title order={3} ta="center" c={"gray.1"} size="22px">
              Today
            </Title>
            <Text ta="center" fw={800} c={"gray.1"} size="36px">
              {data.todaysClicks} Clicks
            </Text>
            <Text ta="center" fw={600} c={"gray.3"}>
              0 Yesterday
            </Text>
          </div>
        </Paper>
      )}
    </>
  );
}
