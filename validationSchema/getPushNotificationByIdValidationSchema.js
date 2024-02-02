import { param } from "express-validator";

export const getPushNotificationByIdValidationSchema=[
    param("notificationId").notEmpty().withMessage("Notification Id is required")
]