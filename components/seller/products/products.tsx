"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  getKeyValue,
  Button,
} from "@nextui-org/react";

import { EyeIcon, EditIcon, DeleteIcon, EyeOff } from "lucide-react";
import { IProductFetched, ISellerFetched } from "@/types";
import {
  useDeleteProduct,
  useGetProducts,
  useUpdateProduct,
} from "@/utils/hooks/useProduct";
import { useSellerAuth } from "@/utils/sellerAuth";
import { milkProducts } from "@/app/data";
import { deleteFile, useCustomToast } from "@/components/helpers/functions";
import Edit_Modal from "@/components/products/Edit_Modal";
const columns = [
  { name: "NAME", uid: "name" },
  { name: "PRICE", uid: "price" },
  { name: "STATUS", uid: "active" },
  { name: "ACTIONS", uid: "actions" },
];
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export function Products_Table() {
  const { seller } = useSellerAuth();
  const { data, isPending } = useGetProducts(seller._id);
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const products = data || [];

  const RenderCell = ({
    product,
    columnKey,
  }: {
    product: IProductFetched;
    columnKey: React.Key;
  }) => {
    const { mutateAsync: edit } = useUpdateProduct();
    const { customToast, loading } = useCustomToast();
    const { mutateAsync: deleteProduct } = useDeleteProduct();
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: product.thumbnail }}
            description={product.category}
            name={product.name}
          >
            {product.business.name}
          </User>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {product.price +
                " " +
                (milkProducts.find((item) => item.slug === product.category)
                  ?.priceUnit || "")}
            </p>
          </div>
        );
      case "active":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[product.active ? "active" : "paused"]}
            size="sm"
            variant="flat"
          >
            {product.active ? "active" : "paused"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Status">
              <Button
                isIconOnly
                onClick={async () => {
                  return customToast({
                    func: async () => {
                      await edit({ _id: product._id, active: !product.active });
                    },
                  });
                }}
                variant="flat"
                className="text-lg bg-transparent text-default-400 cursor-pointer active:opacity-50"
              >
                {product.active ? <EyeIcon /> : <EyeOff />}
              </Button>
            </Tooltip>
            <Tooltip
              content={product.active ? "Pause product" : "Activate product"}
            >
              <Edit_Modal product={product} />
            </Tooltip>
            <Tooltip color="danger" content="Delete product">
              <Button
                isIconOnly
                onClick={async () => {
                  return customToast({
                    func: async () => {
                      await deleteFile(product.thumbnail);
                      await deleteProduct(product._id);
                    },
                  });
                }}
                className=" bg-transparent text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={products}
        emptyContent={isPending ? "Loading..." : "No products found"}
      >
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => {
              return (
                <TableCell>
                  <RenderCell product={item} columnKey={columnKey} />
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
