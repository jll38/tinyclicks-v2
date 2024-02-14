import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import Navbar from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/footer/Footer";

const theme = createTheme({
  /** Put your mantine theme override here */
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <MantineProvider theme={theme}>
        <body className={inter.className}>
          <Notifications />
          <Navbar />
          {children}
          <Footer />
        </body>
      </MantineProvider>
    </html>
  );
}
