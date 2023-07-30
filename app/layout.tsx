import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import ModalProvider from "@/providers/modal-provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Store description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <ModalProvider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
