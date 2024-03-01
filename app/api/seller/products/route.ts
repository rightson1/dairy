import Product from "@/models/Product";
import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  await conn();

  try {
    const productData = await req.json();

    const slugCount = await Product.countDocuments({
      slug: productData.slug,
    });
    if (slugCount > 1) {
      productData.slug = `${productData.slug}-${slugCount}`;
    }
    const product = await Product.create(productData).catch((e) => {
      console.log(e);
      throw new Error(e._message || "Error creating Product");
    });
    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      data: product,
    });
  } catch (e) {
    return NextResponse.json({
      message: (e as Error).message,
      success: false,
    });
  }
}
export async function GET(req: NextRequest) {
  await conn();
  Seller;
  try {
    const sellerId = req.nextUrl.searchParams.get("sellerId");
    const products = await Product.find({
      business: sellerId,
    }).populate("business");
    return NextResponse.json(products);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Error fetching Products",
      success: false,
    });
  }
}
