"use client";
import { ISellerFetched } from "@/types";
import { useGetSellers } from "@/utils/hooks/useSeller";
import React from "react";
import LoadingRandomMessage from "../components/LoadingRandomMessage";
import { CustomBreadCrumb } from "@/components/shared/custom_bread_crumb";
import { Input } from "@nextui-org/react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { Home, Search } from "lucide-react";
import Bottom from "@/components/shared/Bottom";
import { useGetSellerByCategory } from "@/utils/hooks/useSeller";
import { getCategoryBySlug } from "@/components/helpers/functions";
import Link from "next/link";
import Image from "next/image";

const Page = ({
  params: { farmer: _id },
}: {
  params: {
    farmer: string;
  };
}) => {
  const { data } = useGetSellers();
  const [farmers, setFarmers] = React.useState<ISellerFetched[]>([]);

  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    if (!data) return;
    if (search === "") return setFarmers(data);
    setFarmers(data.filter((product) => product.name.includes(search)));
  }, [search, data]);
  if (!data) return <LoadingRandomMessage />;
  return (
    <div className="py-10 pxs fx-col gap-5">
      <div className="fx-b ">
        <CustomBreadCrumb items={["Home", "Farmers"]} />
      </div>
      <div className="fx-b ">
        <h2 className="h2">Farmers</h2>
        <Input
          type="text"
          placeholder="Farmer's Name"
          labelPlacement="outside"
          className="w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endContent={
            <Button color="primary" size="sm" isIconOnly>
              <Search className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            </Button>
          }
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {farmers.map((farmer) => (
          <Card
            className="py-4"
            key={farmer.name}
            as={Link}
            href={`/farmers/${farmer._id}`}
          >
            <CardBody className=" py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-[150px]"
                src={farmer.thumbnail!}
                width={270}
                height={270}
              />
            </CardBody>
            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="p text-default-400  text-sm flex gap-2">
                <Home className="text-default-400 w-4" />
                {farmer.location}
              </p>
              <h4 className="font-bold text-large">{farmer.name}</h4>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Bottom />
    </div>
  );
};

export default Page;
