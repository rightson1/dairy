"use client";
import { toast } from "react-hot-toast";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/utils/firebase";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { ImageInputProps } from "@/types";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Minus } from "lucide-react";
import { milkProducts } from "@/app/data";
export const useCustomToast = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const customToast = ({
    func,
    sfunc,
    loading,
    suc,
    err,
    efunc,
  }: {
    func: () => Promise<any>;
    sfunc?: () => void;
    loading?: string;
    suc?: string;
    err?: string;
    efunc?: (() => Promise<void>) | (() => void);
  }) => {
    setModalOpen(true);
    setLoading(true);
    return toast.promise(
      func()
        .then((res) => {
          const data = res?.data;
          if (data && data.success === false) {
            throw new Error(data.message);
          }
          setLoading(false);
          setModalOpen(false);
          if (sfunc) sfunc();
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          if (efunc) efunc();
          throw e;
        }),

      {
        loading: loading || "Loading...",
        success: suc || "Success",
        error: (e) => {
          setTimeout(() => {
            toast.dismiss();
          }, 3000);
          return e.message || err || "An error occurred";
        },
      }
    );
  };
  return { customToast, loading, modalOpen, setModalOpen };
};

export const uploadFile = (file: File, name: string) => {
  const fileRef = ref(storage, `/${name}`);
  return uploadBytes(fileRef, file)
    .then((res) => getDownloadURL(res.ref))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const deleteFile = async (url: string) => {
  try {
    const deleteRef = ref(storage, url);
    await deleteObject(deleteRef).then(() => {
      return true;
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};

export const eCheck = (res: AxiosResponse<any, any>) => {
  const data = res.data;
  if (data && data.success === false) {
    throw new Error(data.message);
  }
  return data;
};
export const ImageInput = (props: ImageInputProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFile(event.target.files?.[0] || null);
  };

  const randomId = Math.random().toString(36).substring(7);

  return (
    <div
      className="border-2 border-dashed rounded-lg
       py-8 p-4 flex flex-col items-center justify-center w-full"
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id={randomId}
        onChange={handleFileChange}
        multiple={props.multiple}
      />
      <label
        htmlFor={randomId}
        className="flex flex-col items-center cursor-pointer"
      >
        <p className="p-sm md:max-w-1/2 text-center">
          <span>
            Upload your images here, or{" "}
            <span className="text-violet-500">click to browse</span>
          </span>{" "}
          1200 x 1600 (3:4) recommended, up to 10MB each
        </p>
      </label>
    </div>
  );
};

export const ImageInputWithView = (props: ImageInputProps) => {
  return (
    <div className="fx-c gap-5 py-5">
      <ImageInput multiple={false} file={props.file} setFile={props.setFile} />

      {props.file && (
        <div className="fx-b py-5 w-full items-center">
          <Image
            src={URL.createObjectURL(props.file)}
            width={200}
            height={200}
            alt="Image"
            className="h-30 object-cover  rounded-lg"
          />
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => {
              props.setFile(null);
            }}
          >
            <Minus className=" text-xl" />
          </Button>
        </div>
      )}
    </div>
  );
};
export const getSlug = (name: string) => {
  return name.toLowerCase().replace(/\s/g, "-");
};
export const getCategoryBySlug = (slug: string) => {
  return milkProducts.find((product) => product.slug === slug);
};
export const getPriceLabel = (slug: string) => {
  return getCategoryBySlug(slug)?.priceUnit;
};
export const getProductPrice = (price: string | number, slug: string) => {
  return price + " " + getPriceLabel(slug);
};
export const eMongo = (err: any) => {
  return err._message;
};
