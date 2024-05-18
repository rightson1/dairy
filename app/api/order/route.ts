import { eMongo } from "@/components/helpers/functions";
import { conn } from "@/models/mongo_db_connection";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await conn();
    const body = await req.json();

    const order = new Order(body);
    await order.save();
    return NextResponse.json({ message: "Order placed successfully" });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      message: e.message,
      success: false,
      status: 500,
    });
  }
}
//get by ether business id or user id
export async function GET(req: NextRequest, res: NextResponse) {
  const business = req.nextUrl.searchParams.get("business");
  const uid = req.nextUrl.searchParams.get("uid");
  const query = business ? { business } : { uid };
  console.log(query);
  try {
    const orders = await Order.find(query).populate([
      { path: "product" },
      { path: "business" },
    ]);
    return NextResponse.json(orders);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      message: e.message,
      success: false,
      status: 500,
    });
  }
}
//edit order
export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);
  try {
    const order = await Order.findByIdAndUpdate(
      body._id,
      { status: body.status },
      { new: true }
    );
    return NextResponse.json(order);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      message: e.message,
      success: false,
      status: 500,
    });
  }
}
