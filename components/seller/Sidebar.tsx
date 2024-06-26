import React from "react";
import { Avatar, Button } from "@nextui-org/react";
import {
  Home,
  LogOut,
  Mail,
  MailCheck,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useSellerAuth } from "@/utils/sellerAuth";

const Sidebar = () => {
  const { seller, logout } = useSellerAuth();
  return (
    <div className="px-4 py-10 border-r-1 border-divider w-full gap-10 fx-col">
      <div className="fx-col gap-3">
        <Avatar isBordered color="default" name="Mwai" />
        <div className="fx-col gap-1">
          <p>Store</p>
          <h5 className="h5">{seller?.name}</h5>
        </div>
      </div>
      <div className="fx-col">
        <Button
          startContent={<Mail />}
          variant="flat"
          className="w-full bg-transparent justify-start"
          as={Link}
          href="/seller"
        >
          Home
        </Button>
        <Button
          startContent={<ShoppingCart />}
          variant="flat"
          className="w-full bg-transparent justify-start"
          as={Link}
          href="/seller/products"
        >
          Products
        </Button>

        <Button
          startContent={<MailCheck />}
          variant="flat"
          className="w-full bg-transparent justify-start"
          as={Link}
          href="/seller/chat"
        >
          Chat
        </Button>

        <Button
          startContent={<Settings />}
          variant="flat"
          className="w-full bg-transparent justify-start"
          as={Link}
          href="/seller/settings"
        >
          Settings
        </Button>
        <Button
          startContent={<ShoppingCart />}
          variant="flat"
          className="w-full bg-transparent justify-start"
          as={Link}
          href="/"
        >
          Storefronts
        </Button>
        {/*  */}
        <Button
          variant="flat"
          startContent={<LogOut />}
          className="w-full bg-transparent justify-start"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
