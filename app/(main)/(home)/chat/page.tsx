"use client";
import Chat from "@/components/shared/Chat";
import { useAuth } from "@/utils/AuthContext";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="p-4">
      <Chat id={user?._id} userType="user" />
    </div>
  );
};

export default Page;
