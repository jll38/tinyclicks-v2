"use client";
import React, { FC, ReactNode } from "react";
import TopPerformers from "../../components/shared/dashboard/TopPerformers/TopPerformers";
import TodaysClicks from "@/components/shared/dashboard/TodaysClicks/TodaysClicks";
import { Container, Grid, SimpleGrid, Skeleton, rem } from "@mantine/core";


export default function Dashboard() {
  return (
    <main style={{ width: "90vw", padding: 20 }}>
      <LeadGrid pos1={<TopPerformers />} />
    </main>
  );
}

interface LeadGridProps {
  pos1: ReactNode; // Use ReactNode for components/elements
}

function LeadGrid({ pos1 }: LeadGridProps) {
  const PRIMARY_COL_HEIGHT = rem(300);

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="lg">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {pos1}
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TodaysClicks />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
