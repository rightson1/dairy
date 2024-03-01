import { milkProducts } from "@/app/data";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [categories, setCategories] = React.useState(milkProducts);
  React.useEffect(() => {
    if (search === "") return setCategories(milkProducts);
    setCategories(
      milkProducts.filter((product) => product.name.includes(search))
    );
  }, [search]);
  return (
    <div className="pxs fx-col gap-4">
      <h2 className="h2"></h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {milkProducts
          .filter((product) => product.name.includes(search))
          .map((product) => (
            <Card
              className="py-4"
              key={product.name}
              as={Link}
              href={`/categories/${product.slug}`}
            >
              <CardBody className=" py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl h-[150px]"
                  src={product.image}
                  width={270}
                  height={270}
                />
              </CardBody>
              <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{product.name}</h4>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Categories;
