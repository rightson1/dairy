import { Schema, Types, model, models } from "mongoose";
const ConversationSchema = new Schema(
  {
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Conversation =
  models.Conversation || model("Conversation", ConversationSchema);
export default Conversation;
