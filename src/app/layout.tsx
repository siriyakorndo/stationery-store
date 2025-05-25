"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <div
            className={`hidden md:block fixed top-0 left-0 z-10 bg-white h-full border-r md:relative md:w-1/4 lg:w-1/6`}
          >
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1 overflow-auto bg-gray-200">
            <div className="block md:hidden w-full h-16 bg-white shadow px-4 flex items-center">
              <Navbar/>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-4">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
