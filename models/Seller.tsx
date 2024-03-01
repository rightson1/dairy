import { Schema, model, models } from "mongoose";

const SellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
    },

    deliveryOptions: [
      {
        type: String,
        enum: ["Pickup", "Delivery"],
      },
    ],
    socialMediaLinks: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Seller = models.Seller || model("Seller", SellerSchema);
export default Seller;
