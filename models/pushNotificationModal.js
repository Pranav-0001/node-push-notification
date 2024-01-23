import mongoose from "mongoose";

const actionSchema = new mongoose.Schema({
  type: { type: String },
  title: { type: String },
  action: { type: String },
});

const pushNotificationSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    data: {
      title: { type: String },
      options: {
        body: { type: String },
        actions: [actionSchema],
        image: { type: String },
        icon: { type: String },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("pushNotifications", pushNotificationSchema);
