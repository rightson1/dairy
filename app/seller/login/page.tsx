"use client";

import React from "react";
import { eCheck, useCustomToast } from "@/components/helpers/functions";
import { useSellerAuth } from "@/utils/sellerAuth";
import axios from "axios";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";

const LOGIN = () => {
  const { customToast, loading } = useCustomToast();
  const { signIn } = useSellerAuth();
  const addAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value.trim() as string;
    const password = e.currentTarget.password.value.trim() as string;
    customToast({
      func: async () => {
        await signIn({ email, password }).catch((e) => {
          const message = e.message;
          throw new Error(message);
        });
      },
      suc: "Welcome Back",
    });
  };
  return (
    <div className="w-full h-screen fxc bg-background pxs">
      <div className="flex   w-full h-full mb:max-w-64 md:w-96  flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center w-full ">
          <h1 className="text-3xl font-bold text-primary">Login</h1>
          <p className="text-sm text-muted-foreground">
            Welcome Back Dont have an account?{" "}
            <Link href="/seller/register" className="undeline">
              Register
            </Link>
          </p>
        </div>
        <form
          onSubmit={addAdmin}
          className="flex flex-col items-center justify-center w-full "
        >
          <div className="flex flex-col items-center justify-center w-full"></div>
          <div className="flex flex-col space-y-1.5 w-full">
            <Input
              id="email"
              name="email"
              placeholder="Email "
              className="bg-muted border-border"
              required
            />
            <Input
              id="password"
              name="password"
              placeholder="Password "
              className="bg-muted border-border"
              required
              // type="password"
            />

            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LOGIN;
