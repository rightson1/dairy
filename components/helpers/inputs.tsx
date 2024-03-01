import { Button, Input, Slider } from "@nextui-org/react";
import { UploadCloud, XCircle } from "lucide-react";
import Image from "next/image";
import { Image as ImageN } from "@nextui-org/react";

export const ImageField = ({
  selectedImage,
  setSelectedImage,
  name,
}: {
  selectedImage: File | null;
  name: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const handleImageClear = () => {
    setSelectedImage(null);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="fx-col gap-2">
      <h5 className="h6-style">Upload School Image</h5>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        name={name}
      />
      {!selectedImage ? (
        <div className="fx-col bg-content2  rounded-md">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            name={name}
            id={name}
          />
          <Button
            as={"label"}
            htmlFor={name}
            className="w-full h-[80px] fx-col-c bg-transparent opacity-70"
          >
            <UploadCloud />
            <span>Upload School Image</span>
          </Button>
        </div>
      ) : (
        <div
          className="w-full overflow-hidden h-[200px]
         fx-col-c bg-content2 rounded-md relative "
        >
          <ImageN
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            className="w-full h-full rounded-md overflow-hidden z-1 "
          />
          <div className="w-full h-full absolute bg-black/30 " />

          <Button
            color="danger"
            // variant="ghost"
            isIconOnly
            className="absolute bg-transparent top-0 right-0 cursor-pointer"
          >
            <XCircle fontSize="small" onClick={handleImageClear} />
          </Button>
        </div>
      )}
    </div>
  );
};
