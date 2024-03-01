"use client";
import Bottom from "@/components/shared/Bottom";
import { CustomBreadCrumb } from "@/components/shared/custom_bread_crumb";
import { useGetSellerById } from "@/utils/hooks/useSeller";
import React from "react";
import LoadingRandomMessage from "../../components/LoadingRandomMessage";
import { Button, Divider } from "@nextui-org/react";
import { LocateIcon, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useGetProducts, useGetSingleProduct } from "@/utils/hooks/useProduct";
import { getPriceLabel } from "@/components/helpers/functions";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
const Page = ({
  params: { product: _id },
}: {
  params: {
    product: string;
  };
}) => {
  const { data: product } = useGetSingleProduct(_id);
  const { modalStates, loggedIn } = useAuth();
  const router = useRouter();
  if (!product) return <LoadingRandomMessage />;
  return (
    <div className="py-10 pxs fx-col gap-5 ">
      <div className="fb ">
        <CustomBreadCrumb items={["Home", "Products", product.name]} />
      </div>
      <div className="fxc ">
        <div className="max-w-4xl w-full fx-col gap-5 ">
          <h2 className="h2">{product.name}</h2>
          <div className="w-full fb">
            <Image
              src={product.thumbnail!}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg"
            />
            <div className="fx-col justify-center gap-3 pxs w-full">
              <h6 className="h6 text-blue-600">
                {" "}
                {product.price + " " + getPriceLabel(product.category)}
              </h6>
              <Divider />
              <p className="p">
                {product.description || "No description available"}
              </p>
              <Divider />
              <Button
                className="bg-primary"
                onPress={() => {
                  if (!loggedIn) {
                    modalStates.onOpen();
                  } else {
                    console.log("Ordering");
                    router.push(`/checkout/${product._id}`);
                  }
                }}
              >
                Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Bottom />
    </div>
  );
};

export default Page;
