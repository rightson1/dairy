import Message from "@/models/Message";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/utils/pusher";
import { IMessage } from "@/types";
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await conn();
    const clientMessage: IMessage = await req.json();

    const newMessage = await Message.create(clientMessage);
    await pusherServer.trigger(
      clientMessage.conversationId,
      "new:message",
      newMessage
    );
    return NextResponse.json(newMessage);
  } catch {
    return NextResponse.json({
      message: "Failed to create conversation",
      success: false,
    });
  }
};
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await conn();
    const conversationId = await req.nextUrl.searchParams.get("conversationId");
    const messages = await Message.find({ conversationId });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({
      message: "Failed to fetch messages",
      success: false,
    });
  }
};
