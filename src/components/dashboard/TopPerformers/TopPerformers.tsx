"use client";
import cx from "clsx";
import { useState, useEffect } from "react";
import { Table, ScrollArea, Paper, Title, Skeleton } from "@mantine/core";
import classes from "./TopPerformers.module.scss";

export default function TopPerformers() {
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
  const [scrolled, setScrolled] = useState(false);

  return (
    <>
      {!data && (
        <Skeleton height={"100%"} animate={true} miw={200} radius={20} />
      )}
      {data && (
        <Paper radius={20} shadow={"sm"} style={{ padding: 10 }}>
          <Title order={3}>Top Performers</Title>

          <ScrollArea
            h={200}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            <Table miw={200}>
              <Table.Thead
                className={cx(classes.header, { [classes.scrolled]: scrolled })}
              >
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>ShortURL</Table.Th>
                  <Table.Th>Clicks</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.map((row: any, i: number) => (
                  <Table.Tr key={"link-" + i}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>{row.name}</Table.Td>
                    <Table.Td>{row.shortURL}</Table.Td>
                    <Table.Td>{row.clicks}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
      )}
    </>
  );
}
