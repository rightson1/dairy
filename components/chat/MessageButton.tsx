"use client";
import { useAuth } from "@/utils/AuthContext";
import { Mail } from "lucide-react";
import { useQueryState } from "next-usequerystate";
import { useRouter } from "next/navigation";
import React from "react";
import { useCustomToast } from "../helpers/functions";
import { useCreateConversation } from "@/utils/hooks/useConversation";
import toast from "react-hot-toast";

const MessageButton = (props: { farmerId: string }) => {
  const { modalStates, loggedIn, user } = useAuth();
  const router = useRouter();
  const { mutateAsync: createConversation, data } = useCreateConversation();
  const { loading, customToast } = useCustomToast();
  const handleClicked = async () => {
    if (!user?._id) {
      return toast.error("User not found");
    }
    await customToast({
      func: async () => {
        return await createConversation({
          members: [user?._id, props.farmerId],
        });
      },
      sfunc: async () => {
        router.push(`/chat?conversation=${data?._id}`);
      },
    });
  };
  return (
    <div
      className="fx-col items-center gap-2 cursor-pointer"
      onClick={() => {
        if (!loggedIn) {
          modalStates.onOpen();
        } else {
          handleClicked();
        }
      }}
    >
      <Mail className="h-5" />
      <h6 className="h6">Message</h6>
    </div>
  );
};

export default MessageButton;
