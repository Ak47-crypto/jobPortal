
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MyProvider } from "@/context/SiteContext";
import { Toaster } from "@/components/ui/toaster"
import MetaMaskLIstener from "@/components/MetaMaskLIstener";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import Footer from "@/components/Footer";
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
        <AuthProvider>
        <MyProvider>
          <Navbar/>
        {children}
        <Footer/>
        <MetaMaskLIstener/>
        
        </MyProvider>
        </AuthProvider>
        <Toaster/>
        
        </body>
    </html>
  );
}
