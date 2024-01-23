import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscription: {
      type: Object,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscriptions", subscriptionSchema);
