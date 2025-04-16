import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Typography, Button, Box, Stack} from "@mui/material";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cutz 2",
  description: "schedule haircut appointments easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
        <Typography variant="h1" component="h2">
          Cutz
        </Typography>
        <Box sx={{alignContent: "center"}}>
          <Stack spacing={3} direction={"row"}>
          <Button variant="outlined" sx={{color: "white"}}>Profile</Button>
          <Button variant="outlined" sx={{color: "white"}}>Services</Button>
          <Button variant="outlined" sx={{color: "white"}}>Calendar</Button>
          </Stack>
        </Box>
        </Box>
        {children}
      </body>
    </html>
  );
}
