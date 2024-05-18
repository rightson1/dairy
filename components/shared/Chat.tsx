"use client";
import { ISellerFetched, IUserFetched, TConversation } from "@/types";
import { useAuth } from "@/utils/AuthContext";
import { useGetUserConversations } from "@/utils/hooks/useConversation";
import { useSellerAuth } from "@/utils/sellerAuth";
import { Avatar, Input } from "@nextui-org/react";
import { useQueryState } from "next-usequerystate";
import React, { useEffect } from "react";
import ChatBox from "./ChatBox";
import clsx from "clsx";

const Chat = ({ id, userType = "user" }: { id: string; userType?: string }) => {
  const [conversations, setConversations] = React.useState<TConversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    React.useState<TConversation | null>(null);
  const { data: conversations_raw, isLoading } = useGetUserConversations(
    id,
    userType
  );
  useEffect(() => {
    if (conversations_raw) {
      setConversations(conversations_raw);
    }
  }, [conversations_raw]);
  return (
    <div className="grid grid-cols-3">
      <div className="w-full border-divider border-r h-full p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="h3">Your Chats</h3>
          <input className="border-b-2 border-focus w-full px-2 outline-none rounded-md h-10" />
        </div>
        <Conversations
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      </div>

      <div className="w-full col-span-2">
        {selectedConversation ? (
          <ChatBox conversation={selectedConversation} _id={id} />
        ) : (
          <div className="h-full flex items-center justify-center min-h-[87vh]">
            <h3 className="h3">Select a conversation to start chatting</h3>
          </div>
        )}
      </div>
    </div>
  );
};
const Conversations = (props: {
  conversations: TConversation[];
  selectedConversation: TConversation | null;
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<TConversation | null>
  >;
}) => {
  return (
    <div className="space-y-3   ">
      {props.conversations.map((conversation, index) => {
        return (
          <div
            key={index}
            onClick={() => props.setSelectedConversation(conversation)}
            className={clsx(
              `flex items-center  p-2
hover:bg-background/30
              space-x-3 border-b border-divider 
              pb-2 cursor-pointer`,
              props.selectedConversation?._id === conversation._id &&
                "bg-background/30"
            )}
          >
            <Avatar color="default" />
            <div>
              <h5 className="h5">
                {"name" in conversation.sentBy
                  ? (conversation.sentBy as ISellerFetched).name
                  : (conversation.sentBy as IUserFetched).displayName}
              </h5>
              <p>
                {conversation.lastMessage ??
                  conversation.sentBy.email.slice(0, 13)}
                ...
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
