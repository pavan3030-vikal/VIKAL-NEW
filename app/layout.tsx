"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&family=Montserrat&family=Nunito&family=Open+Sans&family=Roboto&family=Lato&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Playfair+Display:wght@700&family=DM+Sans:wght@700&family=Inter:wght@400;500;600&display=swap" />
      </head>
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}