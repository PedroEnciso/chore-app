import type { Metadata } from "next";
import "../globals.css";
import style from "./styles.module.css";
import { inter } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "Poop App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
