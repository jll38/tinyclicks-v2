"use client";
import cx from "clsx";
import { useState, useEffect } from "react";
import { Table, ScrollArea, Paper, Title, Skeleton } from "@mantine/core";
import classes from "./TopPerformers.module.scss";

export default function DailyClicks() {
    useEffect(() => {
      fetch(
        `api/dashboard?usr=65c3fd2b7b44e07ada89f6ba&operation=top-performers`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((responseData) => setData(responseData.data));
    }, []);

  const [data, setData] = useState<any>(null);

  return (
    <>
      {!data && (
        <Skeleton height={"130px"} animate={true} miw={200} radius={20} />
      )}
      {data && (
        <Paper radius={20} shadow={"sm"} h={"130px"} style={{ padding: 10 }}>
          <Title order={3}>Engagement Over Time</Title>
        </Paper>
      )}
    </>
  );
}
