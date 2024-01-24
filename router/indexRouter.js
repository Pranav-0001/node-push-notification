import express from "express";
import subscribeModal from "../models/subscribeModal.js";

import {
  createPushNotification,
  pushSubscribe,
  triggerPushNotificationById,
} from "../controller/pushNotificationController.js";
import { createPushNotificationValidationSchema } from "../validationSchema/createPushNotificationValidationSchema.js";
import { validateRequest } from "../helpers/validateRequest.js";
import { validateToken } from "../helpers/validateToken.js";
const router = express.Router();

router.post("/subscribe", pushSubscribe);

router.post("/trigger", triggerPushNotificationById);

router.post(
  "/create",
  validateToken,
  createPushNotificationValidationSchema,
  validateRequest,
  createPushNotification
);

export default router;
