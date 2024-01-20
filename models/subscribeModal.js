import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscription: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscriptions", subscriptionSchema);
