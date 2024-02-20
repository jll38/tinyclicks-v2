import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.module.css";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider, Flex, NavLink } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { NavbarMinimal as SideNav } from "@/components/shared/dashboard/SideNav/SideNav";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { navigate } from "@/lib/navigate";
const theme = createTheme({
  /** Put your mantine theme override here */
});
const inter = Inter({ subsets: ["latin"] });

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <Flex>
      <SideNav />
      <main>{children}</main>
    </Flex>
  );
}
