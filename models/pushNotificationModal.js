import mongoose from "mongoose";

const pushNotificationSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    data: {
      title: { type: String },
      options: {
        body: { type: String },
        actions: [Object],
        image: { type: String },
        icon: { type: String },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("pushNotifications", pushNotificationSchema);
