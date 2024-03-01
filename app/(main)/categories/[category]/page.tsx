"use client";
import React from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { Home, Search } from "lucide-react";
import { CustomBreadCrumb } from "@/components/shared/custom_bread_crumb";
import Bottom from "@/components/shared/Bottom";
import { useGetSellerByCategory } from "@/utils/hooks/useSeller";
import { getCategoryBySlug } from "@/components/helpers/functions";
import { ISellerFetched } from "@/types";
import Link from "next/link";
import Image from "next/image";
import LoadingRandomMessage from "../../components/LoadingRandomMessage";

const Categories = ({
  params: { category: slug },
}: {
  params: {
    category: string;
  };
}) => {
  const { data } = useGetSellerByCategory(slug);
  const [farmers, setFarmers] = React.useState<ISellerFetched[]>([]);
  const category = getCategoryBySlug(slug)!;
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
        <CustomBreadCrumb items={["Home", category.name]} />
      </div>
      <div className="fx-b ">
        <h2 className="h2">{category.name}</h2>
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
              <h4 className="font-bold text-large">{farmer.name}</h4>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Bottom />
    </div>
  );
};

export default Categories;
