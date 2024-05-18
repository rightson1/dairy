import { IUser } from "@/types";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import { conn } from "@/models/mongo_db_connection";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await conn();
    const userData: IUser = await request.json();
    const existingUser = await User.findOne({ uid: userData.uid });
    if (existingUser) {
      return NextResponse.json(existingUser, {
        status: 200,
      });
    }
    const newUser = await User.create(userData);
    return NextResponse.json(newUser, {
      status: 201,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      statusText: "Error creating user",
    });
  }
}
export async function PUT(request: NextRequest) {
  try {
    await conn();
    const userData = await request.json();

    const user = await User.findOneAndUpdate(
      {
        _id: userData._id,
      },
      userData,
      {
        new: true,
      }
    );
    if (!user) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "User not found",
      });
    }
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({
      status: 500,
      success: false,
      statusText: "Error updating user",
    });
  }
}
//get user by uid
export async function GET(request: NextRequest) {
  try {
    await conn();
    const uid = request.nextUrl.searchParams.get("uid");
    const user = await User.findOne({ uid });
    if (!user) {
      return NextResponse.json({
        status: 404,
        success: false,
        statusText: "User not found",
      });
    }
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({
      status: 500,
      success: false,
      statusText: "Error fetching user",
    });
  }
}
