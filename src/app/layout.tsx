import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import Navbar from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/footer/Footer";

import SessionWrapper from "./providers/SessionWrapper";

const theme = createTheme({
  /** Put your mantine theme override here */
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinyClicks",
  description: "Acquire and understand your user demographics today,",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <MantineProvider theme={theme}>
          <body className={inter.className} style={{ background: "#F7F9FB" }}>
            <Notifications />
            <Navbar />
            {children}
            <Footer />
          </body>
        </MantineProvider>
      </html>
    </SessionWrapper>
  );
}
