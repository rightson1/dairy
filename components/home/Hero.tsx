"use client";
import { Button, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  return (
    <div
      className=" flex items-center w-full  
     justify-center md:flex-between h-[calc(100vh-100px)]  pxs gap-10  "
    >
      <div className="fx-col  md:max-w-[550px] gap-5">
        <h1 className="mtc text-3xl md:text-5xl font-bold">
          Make your orders directly From the Farmer.
        </h1>
        <p className=" mtc p ">
          Unlock exclusive access to your beloved vendors and shop directly for
          all your favorite items, products, and services! Dive in and make it
          happen!
        </p>
        <Input
          type="text"
          placeholder="Search Categories"
          labelPlacement="outside"
          className=""
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          endContent={
            <Button color="primary" size="sm" isIconOnly>
              <Search className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            </Button>
          }
        />
      </div>
      <div className="mx-auto hidden md:flex max-w-[500px]">
        <Image
          src="/cow.png"
          alt="hero"
          width={500}
          height={500}
          className=" opacity-90"
        />
      </div>
    </div>
  );
};

export default Hero;
