"use client";
import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Sidebar";
import { IChildren } from "@/types";
import React, { useEffect } from "react";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useRouter } from "next/navigation";
import LoadingRandomMessage from "@/app/(main)/components/LoadingRandomMessage";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { seller, admin } = useSellerAuth();
  const router = useRouter();
  useEffect(() => {
    if (!admin) {
      router.push("/login");
    }
  }, [admin, router]);

  if (!seller) {
    return <LoadingRandomMessage />;
  }
  return (
    <div className="min-h-screen max-w-screen">
      <div
        className="hidden md:flex
         md:w-[250px] md:fixed h-full z-[5]"
      >
        <Sidebar />
      </div>
      <div className="w-full md:pl-[250px] relative z-[3]">
        <div className="sticky top-0 z-[4]">
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
}
