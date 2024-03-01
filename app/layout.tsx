"use client";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import { AuthProvider } from "@/utils/AuthContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import ProgressBar from "next-nprogress-bar";
import "./client.css";
import AuthModal from "@/components/auth/AuthModal";
const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext", "vietnamese", "latin"],
  variable: "--font-manrope",
});
const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext", "vietnamese", "latin"],
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={` ${inter.variable} ${manrope.variable}
        font-inter
        mb:font-manrope w-screen overflow-x-hidden`}
      >
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <AuthProvider>
              <AuthModal />
              <Toaster />

              {children}
            </AuthProvider>
            <ReactQueryDevtools buttonPosition="bottom-left" />
          </QueryClientProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
