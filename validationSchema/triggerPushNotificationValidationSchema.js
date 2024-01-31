import { body } from "express-validator";

export const triggerPushNotificationValidationSchema=[
    body("notificationId").notEmpty().withMessage("Notification Id can't be empty")
]