"use client";
import { useAuth } from "@/utils/AuthContext";
import Image from "next/image";
import React, { useEffect } from "react";
import { GraduationCap, Mail } from "lucide-react";
import { Avatar, AvatarIcon, Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { Power } from "lucide-react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import UniversalLoading from "../components/UniversalLoadin";
import LoadingRandomMessage from "../components/LoadingRandomMessage";
import { User_Orders } from "@/components/orders/user_orders";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoadingRandomMessage />;
  }
  return (
    <div className="min-h-screen relative pxs overflow-hidden">
      <Image
        className="absolute top-0 
        left-0 mb:h-full md:w-full pointer-events-none object-cover opacity-70  "
        alt="Card background"
        src="/map-mesh.png"
        width={1000}
        height={1000}
      />
      <div className="relative fx-col-c gap-3 w-full py-20 ">
        <Avatar
          icon={<AvatarIcon />}
          size="lg"
          classNames={{
            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
            icon: "text-black/80",
          }}
        />
        <h1 className="h1-style text-default-500">{user.displayName}</h1>
        <h5 className="h5-style text-default-500 fx-center gap-2 ">
          <Mail size={25} />
          {user.email || "Loading..."}
        </h5>
        <div className="flex gap-1">
          <Button
            size="md"
            onPress={() => logout()}
            color="default"
            startContent={<Power size={20} />}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="fx-col gap-5">
        <h3 className="h3">Orders</h3>
        <User_Orders />
      </div>
    </div>
  );
};

export default Profile;
