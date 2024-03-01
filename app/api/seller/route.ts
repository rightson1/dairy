import Business from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  await conn();
  try {
    const seller: ISeller = await req.json();
    seller.slug = seller.name.toLowerCase().replace(/\s/g, "-");
    const newSeller = await Business.create(seller);
    return NextResponse.json({
      message: "Seller created successfully",
      success: true,
      data: newSeller,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Error creating seller",
      success: false,
    });
  }
}
export async function GET(req: NextRequest) {
  await conn();
  //get seller by _id
  const _id = req.nextUrl.searchParams.get("_id");
  if (_id) {
    const seller = await Business.findById(_id);
    return NextResponse.json(seller);
  } else {
    const sellers = await Business.find();
    return NextResponse.json(sellers);
  }
}
//edit
export async function PUT(req: NextRequest) {
  await conn();
  try {
    const seller: ISellerFetched = await req.json();
    console.log(seller);
    const newSeller = await Business.findByIdAndUpdate(seller._id, seller, {
      new: true,
    });
    return NextResponse.json({
      message: "Seller updated successfully",
      success: true,
      data: newSeller,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Error updating seller",
      success: false,
    });
  }
}
