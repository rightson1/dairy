import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  MenuItem,
} from "@nextui-org/react";
import { EditIcon } from "lucide-react";
import { IOrderFetched } from "@/types";
import { useSellerAuth } from "@/utils/sellerAuth";
import { Button } from "@nextui-org/react";
import { getProductPrice, useCustomToast } from "../helpers/functions";
import { useEditOrder } from "@/utils/hooks/useOrders";
export default function Order_Modal({ order }: { order: IOrderFetched }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { seller } = useSellerAuth();
  const [status, setStatus] = useState(order.status);
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: editOrder } = useEditOrder();

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        className="text-sm bg-transparent w-full
         text-default-400 cursor-pointer active:opacity-50"
      >
        View / Edit
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
        isDismissable={false}
        as={"form"}
        onSubmit={async (e) => {
          e.preventDefault();

          customToast({
            func: async () => editOrder({ status, _id: order._id }),
          });
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                View / Edit Order
              </ModalHeader>
              <ModalBody>
                <div className="flex-col-start gap-5 bg-content1  p-4  md:mr-5  rounded-md">
                  {/* Item receipts/order */}
                  <div className="flex-col-start gap-2 w-full">
                    <h2 className="p-size  font-bold">Order Summary</h2>
                  </div>
                  <p>Customer Message :{order.description}</p>
                  <div className="fx-b w-full">
                    <h2 className="p-size  font-semibold">Title</h2>
                    <h2 className="p-size  font-semibold">Details</h2>
                  </div>
                  <div className="fx-b w-full">
                    <h2 className="p-size ">Name</h2>
                    <h2 className="p-size ">{order.displayName}</h2>
                  </div>
                  <div className="fx-b w-full">
                    <h2 className="p-size ">Email</h2>
                    <h2 className="p-size ">{order.email}</h2>
                  </div>
                  <div className="fx-b w-full">
                    <h2 className="p-size ">Phone</h2>
                    <h2 className="p-size ">{order.phone}</h2>
                  </div>

                  <hr className="h-[1px] bg-gray-300 w-full" />
                  <div className="fx-b w-full">
                    <h2 className="p-size  font-semibold">Product</h2>
                    <h2 className="p-size  font-semibold">Total</h2>
                  </div>
                  <hr className="h-[1px] bg-gray-300 w-full" />
                  <div className="fx-b w-full">
                    <h2 className="p-size ">{order.product.name}</h2>
                    <h2 className="p-size ">
                      {getProductPrice(order.price, order.product.category)}
                    </h2>
                  </div>
                  <div className="fx-b w-full">
                    <h2 className="p-size ">Quantity</h2>
                    <h2 className="p-size ">{order.quantity}</h2>
                  </div>
                  <div className="fx-b w-full">
                    <h2 className="p-size ">Shipping</h2>
                    <h2 className="p-size ">Local Pickup</h2>
                  </div>
                  <div className="fx-b w-full">
                    <h2 className="p-size ">Total</h2>
                    <h2 className="p-size ">{order.price * order.quantity}</h2>
                  </div>
                  {/* cash on  delivery */}
                  <div className="fx-b w-full">
                    <h2 className="p-size  font-bold">Payment Method</h2>
                    <label className="" htmlFor="name">
                      Cash on Delivery
                    </label>
                  </div>
                  <Select
                    label="Status"
                    name="status"
                    onChange={(e) => {
                      setStatus(e.target.value as (typeof order)["status"]);
                    }}
                    value={status}
                    className="w-full"
                  >
                    <MenuItem key="pending">Pending</MenuItem>
                    <MenuItem key="completed">Completed</MenuItem>
                    <MenuItem key="cancelled">Cancelled</MenuItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
