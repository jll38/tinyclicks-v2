"use client";
import React, { FC, ReactNode } from "react";
import TopPerformers from "@/components/dashboard/TopPerformers/TopPerformers";
import TodaysClicks from "@/components/dashboard/TodaysClicks/TodaysClicks";
import WeeksClicks from "@/components/dashboard/WeeksClicks/WeeksClicks";
import { Container, Grid, SimpleGrid, Skeleton, rem } from "@mantine/core";
import DailyClicks from "@/components/dashboard/DailyClicks/DailyClicks";

export default function Dashboard() {
  return (
    <main style={{ width: "90vw", padding: 20 }}>
      <LeadGrid
        pos1={<TopPerformers />}
        pos2={<TodaysClicks />}
        pos3={<WeeksClicks />}
        pos4={<DailyClicks/>}
      />
    </main>
  );
}

interface LeadGridProps {
  pos1: ReactNode; // Use ReactNode for components/elements
  pos2: ReactNode;
  pos3: ReactNode;
  pos4: ReactNode;
}

function LeadGrid({
  pos1 = <Skeleton height={"100%"} radius="md" animate={false} />,
  pos2 = <Skeleton height={"100%"} radius="md" animate={false} />,
  pos3 = <Skeleton height={"100%"} radius="md" animate={false} />,
  pos4 = <Skeleton height={"100%"} radius="md" animate={false} />,
}: LeadGridProps) {
  const PRIMARY_COL_HEIGHT = rem(300);

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="lg">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {pos1}
        <Grid gutter="md">
          <Grid.Col>{pos4}</Grid.Col>
          <Grid.Col span={6}>{pos2}</Grid.Col>
          <Grid.Col span={6}>{pos3}</Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
