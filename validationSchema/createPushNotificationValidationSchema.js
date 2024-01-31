import { body } from "express-validator";

export const createPushNotificationValidationSchema = [
  body("title").isString().notEmpty(),
  body("options.body").optional().isString(),
  body("options.actions").optional().isArray(),
  body("options.actions.*.type").optional().isString(),
  body("options.actions.*.title").optional().isString(),
  body("options.actions.*.action").optional().isString(),
  body("options.image").optional().isString(),
  body("options.icon").optional().isString(),
];
