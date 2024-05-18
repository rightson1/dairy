"use client";
import Bottom from "@/components/shared/Bottom";
import { CustomBreadCrumb } from "@/components/shared/custom_bread_crumb";
import { useGetSellerById } from "@/utils/hooks/useSeller";
import React from "react";
import LoadingRandomMessage from "../../components/LoadingRandomMessage";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { LocateIcon, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useGetProducts } from "@/utils/hooks/useProduct";
import { getPriceLabel } from "@/components/helpers/functions";
import Link from "next/link";
import MessageButton from "@/components/chat/MessageButton";
const Page = ({
  params: { farmer: _id },
}: {
  params: {
    farmer: string;
  };
}) => {
  const { data: farmer } = useGetSellerById(_id);
  const { data: products } = useGetProducts(_id);
  if (!farmer) return <LoadingRandomMessage />;
  return (
    <div className="py-10 pxs fx-col gap-5 ">
      <div className="fx-b ">
        <CustomBreadCrumb items={["Home", "Farmers", farmer.name]} />
      </div>
      <div className="fxc ">
        <div className="max-w-4xl w-full fx-col gap-5 ">
          <h2 className="h2">{farmer.name}</h2>
          <div className="w-full fx-b">
            <Image
              src={farmer.thumbnail!}
              alt={farmer.name}
              width={600}
              height={600}
              className="rounded-lg"
            />
            <div className="fx-col justify-center gap-3 pxs w-full">
              <h6 className="h6 text-blue-600">{farmer.phone}</h6>
              <Divider />
              <p className="p">
                {farmer.description || "No description available"}
              </p>
              <Divider />
              <div className="fx-b">
                <div className="fx-col items-center gap-2">
                  <a href={`tel:${farmer.phone}`}>
                    <Phone className="h-5" />
                  </a>
                  <h6 className="h6">Call</h6>
                </div>
                <MessageButton farmerId={farmer._id} />
                <div className="fx-col items-center gap-2">
                  <a
                    href={`
                  mailto:${farmer.email}?subject=Inquiry about ${farmer.name}`}
                  >
                    <LocateIcon className="h-5" />
                  </a>
                  <h6 className="h6">{farmer.location}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider className="mt-10" />
      <h3 className="h3">Products</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {products?.map((product) => (
          <Card
            className="py-4"
            key={product.name}
            as={Link}
            href={`/products/${product._id}`}
          >
            <CardBody className=" py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-[150px]"
                src={product.thumbnail}
                width={270}
                height={270}
              />
            </CardBody>
            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="p">
                {product.price + " " + getPriceLabel(product.category)}
              </p>
              <h4 className="font-bold text-large">{product.name}</h4>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Bottom />
    </div>
  );
};

export default Page;
