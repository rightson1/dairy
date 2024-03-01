"use client";
import { Button, Input } from "@nextui-org/react";
import { Bell, Search } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div
      className="h-[70px] border-b-1 items-center
     border-divider w-full gap-10  fx-b pxs bg-background"
    >
      <div className="fx-center gap-3">
        <Search />
        <input
          type="text"
          placeholder="Search for products"
          className="w-full bg-transparent outline-none"
        />
      </div>
      <Button isIconOnly className="bg-transparent">
        <Bell />
      </Button>
    </div>
  );
};

export default Navbar;
