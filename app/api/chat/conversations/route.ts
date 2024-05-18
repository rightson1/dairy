import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import { conn } from "@/models/mongo_db_connection";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await conn();

    const body = await req.json();
    const members: string[] = body.members;
    const [user1, user2] = members.map((id) => new Types.ObjectId(id));
    const conversation = await Conversation.findOne({
      members: { $all: [user1, user2] },
    });

    if (conversation) {
      return NextResponse.json(conversation);
    }
    const newConversation = await Conversation.create({
      members: [user1, user2],
    });
    return NextResponse.json(newConversation);
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await conn();
    const userType = await req.nextUrl.searchParams.get("userType");
    let userId = new Types.ObjectId(
      (await req.nextUrl.searchParams.get("userId"))!
    );
    const conversations = await Conversation.aggregate([
      {
        $match: {
          members: userId,
        },
      },
      {
        $lookup: {
          //from users or sellers
          from: userType === "user" ? "sellers" : "users",
          localField: "members",
          foreignField: "_id",
          as: "members",
        },
      },
      {
        $unwind: "$members",
      },
      {
        $match: {
          "members._id": { $ne: userId },
        },
      },
      {
        $lookup: {
          from: "messages",
          let: { conversationId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$conversationId", "$$conversationId"],
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 1,
            },
            {
              $lookup: {
                from: "users",
                localField: "sender",
                foreignField: "_id",
                as: "sender",
              },
            },
            {
              $unwind: "$sender",
            },
            {
              $project: {
                _id: 1,
                text: 1,
                createdAt: 1,
                read: 1,
                sender: {
                  _id: 1,
                  displayName: 1,
                  email: 1,
                },
              },
            },
          ],
          as: "lastMessage",
        },
      },
      {
        $unwind: {
          path: "$lastMessage",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "messages",
          let: { conversationId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$conversationId", "$$conversationId"],
                },
              },
            },
            {
              $match: {
                read: false,
                sender: { $ne: userId },
              },
            },
            {
              $count: "unreadMessages",
            },
          ],
          as: "unreadMessages",
        },
      },
      {
        $unwind: {
          path: "$unreadMessages",
          preserveNullAndEmptyArrays: true,
        },
      },
      //rename members to sentBy
      {
        $project: {
          _id: 1,
          sentBy: "$members",
          lastMessage: 1,
          unreadMessages: {
            $cond: {
              if: { $eq: ["$unreadMessages", null] },
              then: 0,
              else: "$unreadMessages.unreadMessages",
            },
          },
        },
      },
    ]);

    return NextResponse.json(conversations);
  } catch {
    return NextResponse.json({
      message: "Failed to fetch conversations",
      success: false,
    });
  }
};
