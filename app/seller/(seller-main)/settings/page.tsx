"use client";
import React, { ChangeEvent, useState } from "react";
import {
  ImageInputWithView,
  deleteFile,
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAddSeller, useEditSeller } from "@/utils/hooks/useSeller";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { ISeller, ISellerFetched, InputChangeEventTypes } from "@/types";
import { kenyanCounties } from "@/app/data";
import { useSellerAuth } from "@/utils/sellerAuth";
const Settings = () => {
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: edit_user } = useEditSeller();
  const { seller, fetchSeller } = useSellerAuth();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [values, setValues] = useState<Partial<ISellerFetched>>(seller);
  const editSeller = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = "";
    customToast({
      func: async () => {
        if (thumbnail) {
          seller.thumbnail && (await deleteFile(seller.thumbnail));
          url = await uploadFile(thumbnail, `seller/${seller.uid}/thumbnail`);
        }
        await edit_user({
          ...values,
          _id: seller._id,
          thumbnail: url || seller.thumbnail,
        });
      },
      sfunc: async () => {
        fetchSeller(seller.uid);
      },

      efunc: async () => {
        url && (await deleteFile(url));
      },
    });
  };

  const handleChange = (e: ChangeEvent<InputChangeEventTypes>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <form className="p-4 min-h-screen fx-col gap-5" onSubmit={editSeller}>
      <h3 className="h3">Edit your Business Information</h3>
      <div className="grid grid-cols-1  w-full  gap-4">
        <Input
          id="name"
          isRequired
          placeholder="Name of your Business"
          name="displayName"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <Input
          id="phone"
          placeholder="Your Phone"
          name="phone"
          required
          value={values.phone}
          onChange={handleChange}
        />
        <Select
          label="Select an location"
          className="w-full"
          name="location"
          isRequired
          onChange={handleChange}
          value={values.location}
          defaultSelectedKeys={values.location ? [values.location] : undefined}
        >
          {kenyanCounties.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </Select>
        <Textarea
          id="description"
          placeholder="Your Description"
          name="description"
          isRequired
          value={values.description}
          onChange={handleChange}
        />
        <Input
          id="email"
          placeholder="Your Email"
          name="email"
          isRequired
          value={values.email}
          onChange={handleChange}
        />
        <div className="fx-col">
          <p className="h6 -mb-2">Business Tumbnail</p>
          <ImageInputWithView file={thumbnail} setFile={setThumbnail} />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        Save
      </Button>
    </form>
  );
};

export default Settings;
