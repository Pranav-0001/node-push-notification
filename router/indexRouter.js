import express from "express";
import subscribeModal from "../models/subscribeModal.js";
import webpush from "web-push";
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { subscription } = req.body;
  console.log(subscription);
  const cratedSubscription = await new subscribeModal({ subscription }).save();
  console.log({ cratedSubscription });
});

router.post("/trigger", async (req, res) => {
  const publicVapidKey =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
  const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";
  const allsubscriptions = await subscribeModal.find();
  console.log({ allsubscriptions });
  webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
  );
  const payload = JSON.stringify({
    title: "Pranav C",
    options: {
      body: "I'm a passionate dev",
      actions: [
        { type: "button", title: "Click", action: "redirect_https://www.google.com" },
        { type: "button", title: "Hover", action: "redirect_" },
      ],
      image:
        "https://res.cloudinary.com/pranav123/image/upload/v1690963249/ayzjdguooyyg5kvcwcbb.png",
      icon: "https://res.cloudinary.com/pranav123/image/upload/v1691474323/q1pt5faesi6n5xwji768.webp",
    },
  });
  // Pass object into
  allsubscriptions.forEach((obj) => {
    webpush
      .sendNotification(obj?.subscription, payload)
      .catch((err) => console.error(err));
  });
  res.status(200).json({ status: true });
});

export default router;
