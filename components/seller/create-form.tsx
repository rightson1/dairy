"use client";
import React from "react";

import { useCustomToast } from "@/components/helpers/functions";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAddSeller } from "@/utils/hooks/useSeller";
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
} from "@nextui-org/react";
const Create_Seller = () => {
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: add_seller } = useAddSeller();
  const addSeller = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = e.currentTarget.displayName.value as string;
    const email = e.currentTarget.email.value as string;
    const location = e.currentTarget.location?.value as string;
    const phone = e.currentTarget.phone.value as string;
    const password = e.currentTarget.password.value as string;
    const slug = name.toLowerCase().replace(/\s/g, "-");
    const data = { name, email, location, phone, password, slug };

    const createAdmin = async () => {
      let id = "";
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
        .then(async (userCredential) => {
          const user = userCredential.user;
          const { uid } = user;
          id = uid;
        })
        .catch((error) => {
          const errorMessage = error.message;
          throw new Error(errorMessage);
        });
      await add_seller({ uid: id, ...data });
    };
    customToast({
      func: createAdmin,
      sfunc: () => {
        window.location.href = "/seller";
      },
      efunc: () => {
        console.log("error");
      },
    });
  };
  return (
    <div className="fxc min-h-screen">
      <Card
        onSubmit={(e: unknown) =>
          addSeller(e as React.FormEvent<HTMLFormElement>)
        }
        as="form"
        className="w-[90vw] border-none max-w-[500px]"
      >
        <CardHeader className="fx-col">
          <h1 className="h3">Welcome Aboard</h1>
          <p className="p">
            Your short on cash, create an account and sell this phone
          </p>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1  w-full  gap-4">
            <Input
              id="name"
              isRequired
              placeholder="Name of your Business"
              name="displayName"
            />
            <Input id="phone" placeholder="Your Phone" name="phone" required />
            <Input
              id="location"
              placeholder="Your Location"
              name="location"
              isRequired
            />
            <Input id="email" placeholder="Your Email" name="email" required />
            <Input
              id="password"
              placeholder="Your Password"
              name="password"
              isRequired
            />
          </div>
        </CardBody>
        <CardFooter className="fx-b">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </p>
          <Button type="submit" disabled={loading}>
            Lets Go
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export { Create_Seller };
