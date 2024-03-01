import { Schema, Types, model, models } from "mongoose";
const OrderSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    business: {
      type: Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancelled"],
    },

    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);
const Order = models.Order || model("Order", OrderSchema);
export default Order;
