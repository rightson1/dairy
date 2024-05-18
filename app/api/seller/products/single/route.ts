import Product from "@/models/Product";
import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { IProductUpdate } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await conn();
    const _id = req.nextUrl.searchParams.get("_id");
    Seller;
    const product = await Product.findById(_id).populate("business");

    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({
      message: "Error fetching Products",
      success: false,
    });
  }
}
//edit product
export async function PUT(req: NextRequest) {
  try {
    await conn();
    const productData: IProductUpdate = await req.json();

    const product = await Product.findByIdAndUpdate(
      productData._id,
      productData,
      {
        new: true,
      }
    );
    return NextResponse.json(product);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Error updating Product",
      success: false,
    });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await conn();
    const productId = req.nextUrl.searchParams.get("_id");
    const product = await Product.findByIdAndDelete(productId);
    return NextResponse.json({
      message: "Product deleted successfully",
      success: true,
      data: product,
    });
  } catch (e) {
    return NextResponse.json({
      message: "Error deleting Product",
      success: false,
    });
  }
}
