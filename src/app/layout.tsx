
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MyProvider } from "@/context/SiteContext";
import { Toaster } from "@/components/ui/toaster"
import MetaMaskLIstener from "@/components/MetaMaskLIstener";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobPortal",
  description: "Dapp for jobportal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyProvider>
          <Navbar/>
        {children}
        <MetaMaskLIstener/>
        </MyProvider>
        <Toaster/>
        </body>
    </html>
  );
}
