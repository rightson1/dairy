import Image from "next/image";
import React from "react";

const Bottom = () => {
  return (
    <div className="pxs py-20 gap-10 fx-col">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 ">
        <div className="col-span-2 w-full px-10 py-10 md:py-20 bg-primary">
          <h3 className="h3">Are You A Farmer?</h3>
          <p>
            Access this online feature to boost your sales in the digital space!
          </p>
        </div>
        <div className="flex-1 h-full hidden md:flex ">
          <Image
            src="/categories/milk.jpg"
            alt="Farmer"
            className="h-full w-full object-cover"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="mfc fx-center">
        <div className="">
          <Image
            src="/flower.svg"
            alt="Farmer"
            className="h-full w-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="fx-col max-w-[400px]">
          <h3 className="h2 text-primary mtc">
            Set-up your online shop with us
          </h3>
          <p className="text-xl mtc">
            Do you want to scale up your sales by having an online presence?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
