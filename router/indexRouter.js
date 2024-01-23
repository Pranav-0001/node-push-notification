import express from "express";
import subscribeModal from "../models/subscribeModal.js";

import { pushSubscribe, triggerPushNotificationById } from "../controller/pushNotificationController.js";
const router = express.Router();

router.post("/subscribe", pushSubscribe);

router.post("/trigger", triggerPushNotificationById);

export default router;
