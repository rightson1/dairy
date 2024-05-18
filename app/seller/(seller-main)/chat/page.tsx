"use client";
import Chat from "@/components/shared/Chat";
import { useSellerAuth } from "@/utils/sellerAuth";
import React from "react";
const ChatPage = () => {
  const { seller } = useSellerAuth();
  return <Chat id={seller._id} userType="seller" />;
};

export default ChatPage;
