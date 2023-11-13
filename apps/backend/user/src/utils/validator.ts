import Joi from "joi";

export const emailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message("Invalid email address.")
    .required(),
}).messages({
  "object.unknown": "Invalid input. Please provide a valid email address.",
});

export const passwordSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .message("Password must be at least 6 characters long.")
    .regex(/^(?=.*[a-z])/, "lowercase")
    .message("Password must contain at least one lowercase letter.")
    .regex(/^(?=.*[A-Z])/, "uppercase")
    .message("Password must contain at least one uppercase letter.")
    .regex(/^(?=.*\d)/, "digit")
    .message("Password must contain at least one digit.")
    .required(),
}).messages({
  "object.unknown": "Invalid input. Please provide a valid password.",
});
