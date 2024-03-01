"use client";
import Bottom from "@/components/shared/Bottom";
import { CustomBreadCrumb } from "@/components/shared/custom_bread_crumb";
import { useGetSellerById } from "@/utils/hooks/useSeller";
import React, { ChangeEvent, useEffect, useState } from "react";
import LoadingRandomMessage from "../../components/LoadingRandomMessage";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { LocateIcon, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useGetProducts, useGetSingleProduct } from "@/utils/hooks/useProduct";
import {
  getPriceLabel,
  getProductPrice,
  useCustomToast,
} from "@/components/helpers/functions";
import Link from "next/link";
import { IOrder, InputChangeEventTypes } from "@/types";
import { useAuth } from "@/utils/AuthContext";
import { useCreateOrder } from "@/utils/hooks/useOrders";
const Page = ({
  params: { product: _id },
}: {
  params: {
    product: string;
  };
}) => {
  const { user } = useAuth();

  const { data: product } = useGetSingleProduct(_id);
  const { mutateAsync: addOrder } = useCreateOrder();
  const { loading, customToast } = useCustomToast();
  const [values, setValues] = useState<IOrder>({
    displayName: "",
    email: "",
    phone: "",
    uid: "",
    description: "",
    price: 0,
    quantity: 1,
    business: "",
    product: "",
  });
  useEffect(() => {
    if (user && product) {
      setValues({
        ...values,
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        business: product.business._id,
        product: product._id,
        price: product.price,
      });
    }
  }, [user, product]);

  if (!product || !user) return <LoadingRandomMessage />;
  const handleChange = (e: ChangeEvent<InputChangeEventTypes>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="py-10 pxs fx-col gap-5 ">
      <div className="fb ">
        <CustomBreadCrumb items={["Home", "Checkout", product.name]} />
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          customToast({
            func: async () => addOrder(values),
          });
        }}
        className="fxc "
      >
        <div className="w-full fx-col gap-5 ">
          <h2 className="h2">Checkout</h2>
          <div className="w-full fb ">
            <div className="fx-col w-full gap-5">
              <Input
                type="name"
                label="Name"
                name="displayName"
                isRequired
                value={values.displayName}
                onChange={handleChange}
              />

              <Input
                type="Phone"
                label="Phone"
                name="phone"
                isRequired
                value={values.phone}
                onChange={handleChange}
              />
              <Input
                type="email"
                label="Email"
                name="email"
                isRequired
                value={values.email}
                onChange={handleChange}
              />
              <Input
                label="Quantity"
                name="quantity"
                isRequired
                type="number"
                onChange={(e) => {
                  setValues({ ...values, quantity: parseInt(e.target.value) });
                }}
              />

              <Textarea
                type="location"
                label="Location"
                name="location"
                onChange={handleChange}
                isRequired
              />

              <Textarea
                type="description"
                label="Message"
                name="description"
                onChange={handleChange}
                isRequired
              />
            </div>
            <div className="w-full">
              <div className="flex-col-start gap-5 bg-content1  p-4  md:mr-5  rounded-md">
                {/* Item receipts/order */}
                <div className="flex-col-start gap-2 w-full">
                  <h2 className="p-size  font-bold">Order Summary</h2>
                </div>
                <div className="fx-b w-full">
                  <h2 className="p-size  font-semibold">Product</h2>
                  <h2 className="p-size  font-semibold">Total</h2>
                </div>
                <hr className="h-[1px] bg-gray-300 w-full" />
                <div className="fx-b w-full">
                  <h2 className="p-size ">{product.name}</h2>
                  <h2 className="p-size ">
                    {getProductPrice(product.price, product.category)}
                  </h2>
                </div>
                <div className="fx-b w-full">
                  <h2 className="p-size ">Quantity</h2>
                  <h2 className="p-size ">{values.quantity}</h2>
                </div>
                <div className="fx-b w-full">
                  <h2 className="p-size ">Shipping</h2>
                  <h2 className="p-size ">Local Pickup</h2>
                </div>
                <div className="fx-b w-full">
                  <h2 className="p-size ">Total</h2>
                  <h2 className="p-size ">{product.price * values.quantity}</h2>
                </div>
                {/* cash on  delivery */}
                <div className="fx-b w-full">
                  <h2 className="p-size  font-bold">Payment Method</h2>
                  <label className="" htmlFor="name">
                    Cash on Delivery
                  </label>
                </div>
                {/* Checkout Button */}
                <div className="w-full">
                  <button
                    className="w-full bg-primary text-white p-2 rounded-md"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Bottom />
    </div>
  );
};

export default Page;
