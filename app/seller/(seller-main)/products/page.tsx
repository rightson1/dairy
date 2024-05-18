import { Products_Table } from "@/components/seller/products/products";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Products = () => {
  return (
    <div className="p-4 fx-col gap-5">
      <div className="fx-b">
        <h1 className="text-2xl">Products</h1>
        <Button
          as={Link}
          href="/seller/products/create"
          className="bg-content1"
        >
          Add Product
        </Button>
      </div>
      <Products_Table />
    </div>
  );
};

export default Products;
