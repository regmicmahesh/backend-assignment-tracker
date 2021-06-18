import Joi from "joi";

export interface Login {
  username: string;
  password: string;
}

export interface Register {
  username: string;
  password: string;
  role: "STUDENT" | "TEACHER";
}

export const loginSchema = Joi.object<Login>({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).max(512).required(),
});

export const registerSchema = Joi.object<Register>({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).max(512).required(),
  role: Joi.string().valid("STUDENT", "TEACHER").required(),
});

