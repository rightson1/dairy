import Product from "@/models/Product";
import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await conn();
  const category = req.nextUrl.searchParams.get("category");

  try {
    const businesses_raw = await Product.aggregate([
      { $match: { category: category } },
      { $group: { _id: "$business" } },
      {
        $lookup: {
          from: "sellers",
          localField: "_id",
          foreignField: "_id",
          as: "business",
        },
      },
      { $unwind: "$business" },
    ]);
    const businesses = businesses_raw.map((business) => ({
      ...business.business,
    }));
    return NextResponse.json(businesses);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Error fetching Businesses",
      success: false,
    });
  }
}
