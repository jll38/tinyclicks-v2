"use client";
import cx from "clsx";
import { useState, useEffect } from "react";
import { Table, ScrollArea, Paper } from "@mantine/core";
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
    <Paper radius={20} shadow={"sm"}>
      {data && (
        <ScrollArea
          h={300}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table miw={700}>
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
      )}
    </Paper>
  );
}
