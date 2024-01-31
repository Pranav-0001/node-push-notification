import { matchedData } from "express-validator";
import subscribeModal from "../models/subscribeModal.js";
import webpush from "web-push";
import pushNotificationModal from "../models/pushNotificationModal.js";
export const pushSubscribe = async (req, res) => {
  try {
    const { subscription, owner } = req.body;
    const cratedSubscription = await new subscribeModal({
      subscription,
      owner,
    }).save();
    console.log({ cratedSubscription });
  } catch (error) {}
};

export const triggerPushNotificationById = async (req, res) => {
  try {
    const publicVapidKey =
      "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
    const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

    const requestData = matchedData(req);
    const user = req.user;

    const subscriptions = await subscribeModal.find({ owner: user?._id });
    const notification = await pushNotificationModal.findOne({
      _id: requestData?.notificationId,
    });
    console.log({
      requestData,
      user: req.user,
      subscriptions,
      notification: notification?.data,
    });
    webpush.setVapidDetails(
      "mailto:test@test.com",
      publicVapidKey,
      privateVapidKey
    );
    const payload = JSON.stringify({
      title: notification?.data?.title,
      options: {
        body: notification?.data?.options?.body,
        ...(notification?.data?.options?.actions &&
        notification.data.options.actions.length > 0
          ? {
              actions: [
                {
                  type: notification?.data?.options?.actions?.[0]?.type,
                  title: notification?.data?.options?.actions?.[0]?.title,
                  action: notification?.data?.options?.actions?.[0]?.action,
                },
                {
                  type: notification?.data?.options?.actions?.[1]?.type,
                  title: notification?.data?.options?.actions?.[1]?.title,
                  action: notification?.data?.options?.actions?.[1]?.action,
                },
              ],
            }
          : {}),
        image: notification?.data?.options?.image,
        icon: notification?.data?.options?.icon,
      },
    });
    // Pass object into
    console.log({ payload });
    subscriptions.forEach((obj) => {
      webpush
        .sendNotification(obj?.subscription, payload)
        .catch((err) => console.error(err));
    });
    res.status(200).json({ status: true });
  } catch (error) {}
};

export const createPushNotification = async (req, res) => {
  try {
    const data = matchedData(req);
    const createdPushNotification = await new pushNotificationModal({
      data: data,
      createdBy: req.user?._id,
    }).save();
    res.json({ status: true, createdPushNotification });
  } catch (error) {}
};

export const getAllPushNotificationByUser = async (req, res) => {
  try {
    const user = req.user;
    const pushNotifications = await pushNotificationModal.find({
      createdBy: user._id,
    });
    res.status(200).json({ status: true, pushNotifications });
  } catch (error) {}
};
