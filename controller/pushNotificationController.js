import { matchedData } from "express-validator";
import subscribeModal from "../models/subscribeModal.js";
import webpush from "web-push";
import pushNotificationModal from "../models/pushNotificationModal.js";
export const pushSubscribe = async (req, res) => {
  try {
    const { subscription,owner } = req.body;
    const cratedSubscription = await new subscribeModal({
      subscription,owner
    }).save();
    console.log({ cratedSubscription });
  } catch (error) {}
};

export const triggerPushNotificationById = async (req, res) => {
  try {
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
          {
            type: "button",
            title: "Click",
            action: "redirect_https://www.google.com",
          },
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
  } catch (error) {}
};


export const createPushNotification=async(req,res)=>{
  try {
    const data= matchedData(req)
    const createdPushNotification=await new pushNotificationModal({data:data,createdBy:req.user?._id}).save()
    res.json({status:true,createdPushNotification})
  } catch (error) {
    
  }
}