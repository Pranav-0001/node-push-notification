import express from "express";
import subscribeModal from "../models/subscribeModal.js";

import {
  createPushNotification,
  getAllPushNotificationByUser,
  getPushNotificationById,
  pushSubscribe,
  triggerPushNotificationById,
} from "../controller/pushNotificationController.js";
import { createPushNotificationValidationSchema } from "../validationSchema/createPushNotificationValidationSchema.js";
import { validateRequest } from "../helpers/validateRequest.js";
import { validateToken } from "../helpers/validateToken.js";
import { triggerPushNotificationValidationSchema } from "../validationSchema/triggerPushNotificationValidationSchema.js";
import { getPushNotificationByIdValidationSchema } from "../validationSchema/getPushNotificationByIdValidationSchema.js";
const router = express.Router();

router.post("/subscribe", pushSubscribe);

router.post(
  "/trigger",
  validateToken,
  triggerPushNotificationValidationSchema,
  validateRequest,
  triggerPushNotificationById
);

router.post(
  "/create",
  validateToken,
  createPushNotificationValidationSchema,
  validateRequest,
  createPushNotification
);
router.get(
  "/getAllPushNotificationByUser",
  validateToken,
  getAllPushNotificationByUser
);

router.get(
  "/getPushNotificationById/:notificationId",
  validateToken,
  getPushNotificationByIdValidationSchema,
  validateRequest,
  getPushNotificationById
  
);

export default router;
