import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "lucide-react";
import { IProductFetched } from "@/types";
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
import { useAddProduct, useUpdateProduct } from "@/utils/hooks/useProduct";
import toast from "react-hot-toast";
import { Button, Input, Textarea } from "@nextui-org/react";
import { kenyanCounties, milkProducts } from "@/app/data";

export default function Edit_Modal({ product }: { product: IProductFetched }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { seller } = useSellerAuth();
  const [priceLabel, setPriceLabel] = useState("Price");
  const [values, setValues] = useState<
    Pick<IProductFetched, "name" | "price" | "description" | "category">
  >({
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: editProduct } = useUpdateProduct();

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
  const edit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      ...values,
      slug: getSlug(values.name),
    };

    let thumbnailUrl = "";
    const publishProduct = async () => {
      if (thumbnail) {
        thumbnailUrl = await uploadFile(
          thumbnail,
          `/${seller._id}/products/${data.slug}/thumbnail/${thumbnail.name}`
        );
      }

      const item = {
        ...data,
        thumbnail: thumbnailUrl || product.thumbnail,
        _id: product._id,
      };
      await editProduct(item);
    };
    customToast({
      func: async () => publishProduct(),
      efunc: async () => {
        thumbnailUrl && (await deleteFile(thumbnailUrl));
      },
    });
  };
  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        className="text-lg bg-transparent text-default-400 cursor-pointer active:opacity-50"
      >
        <EditIcon />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
        isDismissable={false}
        as={"form"}
        onSubmit={edit}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit
                {product.name}
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Select an Category"
                  className="w-full"
                  isRequired
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  defaultSelectedKeys={[values.category]}
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
                  value={values.name}
                  onChange={handleChange}
                />
                <Input
                  label={priceLabel}
                  typeof="number"
                  name="price"
                  onChange={handleChange}
                  value={values.price.toString()}
                  isRequired
                />
                <Textarea
                  type="description"
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  isRequired
                />

                <ImageInputWithView file={thumbnail} setFile={setThumbnail} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
