import {
  IMessage,
  IMessageFetched,
  ISellerFetched,
  IUserFetched,
  TConversation,
} from "@/types";
import { useGetChats, useSendMessage } from "@/utils/hooks/useChat";
import { pusherClient } from "@/utils/pusher";
import { Avatar, Button } from "@nextui-org/react";
import clsx from "clsx";
import { Send } from "lucide-react";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { find } from "lodash";
type Props = {
  conversation: TConversation;
  _id: string;
};

const ChatBox = (props: Props) => {
  const { mutateAsync: sendMessage, isPending } = useSendMessage();

  const [message, setMessage] = React.useState<string>("");
  const [chats, setChats] = React.useState<IMessageFetched[]>([]);
  const scroll = useRef<HTMLDivElement>(null);
  const { data: chats_raw, status } = useGetChats(props.conversation._id);
  const { conversation, _id } = props;
  useEffect(() => {
    if (status == "success") {
      setChats(chats_raw);
    }
  }, [chats_raw]);

  const handleSendMessage = async () => {
    if (message.trim() == "") {
      toast.error("Message cannot be empty");
    }
    const newMessage: IMessage = {
      conversationId: conversation._id,
      text: message,
      receiver: conversation.sentBy._id,
      sender: _id,
    };
    try {
      await sendMessage(newMessage, {
        onSuccess: (data: IMessageFetched) => {
          setChats((prev) => {
            if (find(prev, { _id: data._id })) return prev;
            return [...prev, data];
          });
        },
      });
      setMessage("");
    } catch (e) {
      toast.error("Failed to send message");
    }
  };
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    pusherClient.subscribe(conversation._id);
    const messageHandler = (message: IMessageFetched) => {
      setChats((prev) => {
        if (find(prev, { _id: message._id })) return prev;
        return [...prev, message];
      });
    };
    pusherClient.bind("new:message", messageHandler);
    return () => {
      pusherClient.unsubscribe(conversation._id);
      pusherClient.unbind("new:message", messageHandler);
    };
  }, [conversation._id]);
  return (
    <div className="h-[87vh] flex flex-col">
      <div className="px-4  py-2  flex  justify-between w-full  border-b border-divider">
        <div
          className={clsx(
            `flex items-center p-2 hover:bg-background/30 space-x-3 `
          )}
        >
          <Avatar color="default" />
          <div>
            <h5 className="h5">
              {"name" in props.conversation.sentBy
                ? (props.conversation.sentBy as ISellerFetched).name
                : (props.conversation.sentBy as IUserFetched).displayName}
            </h5>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto flex flex-col">
        {chats.map((chat, index) => {
          return (
            <div
              ref={scroll}
              key={index}
              className={clsx(
                `p-2 space-x-3 max-w-[80%] flex`,
                chat.sender == _id ? "justify-end bg-red" : "justify-start"
              )}
            >
              <div
                className={clsx(
                  `flex items-center p-2 bg-background/30 rounded-lg`
                )}
              >
                <p>{chat.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-divider flex gap-1 items-center ">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full p-2 border border-divider rounded-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {isPending ? (
          <Button className="h-full" size="sm" color="primary" isLoading>
            Loading
          </Button>
        ) : (
          <Button
            className="h-full"
            size="sm"
            color="primary"
            onClick={handleSendMessage}
          >
            <Send size={18} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
