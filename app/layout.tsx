"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Orbitron, Poppins, Montserrat, Nunito, Open_Sans, Roboto, Lato, Cinzel, Playfair_Display, DM_Sans, Inter } from "@next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const nunito = Nunito({ subsets: ["latin"], weight: "400" });
const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const lato = Lato({ subsets: ["latin"], weight: "400" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "700" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: "700" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: "700" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${orbitron.className} ${poppins.className} ${montserrat.className} ${nunito.className} ${openSans.className} ${roboto.className} ${lato.className} ${cinzel.className} ${playfairDisplay.className} ${dmSans.className} ${inter.className}`}
      >
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}