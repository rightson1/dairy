"use client";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import {
  IProduct,
  IProductBase,
  IProductType,
  InputChangeEventTypes,
} from "@/types";
import { Select, SelectItem } from "@nextui-org/react";
import {
  deleteFile,
  getSlug,
  ImageInputWithView,
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useAddProduct } from "@/utils/hooks/useProduct";
import toast from "react-hot-toast";
import { Button, Input, Textarea } from "@nextui-org/react";
import { kenyanCounties, milkProducts } from "@/app/data";

export default function NewProductForm() {
  const { seller } = useSellerAuth();
  const [priceLabel, setPriceLabel] = useState("Price");
  const [values, setValues] = useState<Omit<IProduct, "slug">>({
    name: "",
    price: 0,
    description: "",
    category: "",
    thumbnail: "",
    active: true,
    business: seller._id,
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: addProduct } = useAddProduct();

  const handleChange = (e: ChangeEvent<InputChangeEventTypes>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (values.category) {
      setPriceLabel(
        milkProducts.find((product) => product.slug == values.category)
          ?.priceUnit || priceLabel
      );
    }
  }, [values]);
  const publish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!thumbnail) {
      return toast.error("Please select a thumbnail");
    }
    const data = {
      ...values,
      slug: getSlug(values.name),
    };
    console.log(data);

    let thumbnailUrl = "";
    const publishProduct = async () => {
      thumbnailUrl = await uploadFile(
        thumbnail,
        `/${seller._id}/products/${data.slug}/thumbnail/${thumbnail.name}`
      );

      const product: IProduct = {
        ...data,
        thumbnail: thumbnailUrl,
      };
      console.log(product);
      await addProduct(product);
    };
    customToast({
      func: async () => publishProduct(),
      efunc: async () => {
        await deleteFile(thumbnailUrl);
      },
    });
  };

  return (
    <form className="w-full rounded-lg p-4 fx-col gap-4  " onSubmit={publish}>
      <div className="fx-b">
        <h2 className="h3">New Product</h2>
        <Button size={"sm"} type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </div>
      <Select
        label="Select an Category"
        className="w-full"
        isRequired
        name="category"
        onChange={handleChange}
      >
        {milkProducts.map((product) => (
          <SelectItem key={product.slug} value={product.slug}>
            {product.name}
          </SelectItem>
        ))}
      </Select>
      <Input
        type="name"
        label="Name"
        name="name"
        isRequired
        onChange={handleChange}
      />
      <Input
        type="price"
        label={priceLabel}
        typeof="number"
        name="price"
        onChange={handleChange}
        isRequired
      />
      <Textarea
        type="description"
        label="Description"
        name="description"
        onChange={handleChange}
        isRequired
      />

      <ImageInputWithView file={thumbnail} setFile={setThumbnail} />
    </form>
  );
}
