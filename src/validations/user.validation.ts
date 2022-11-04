import joi from "joi";

export const createUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().required(),
});

export const updateUserSchema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  password: joi.string(),
  role: joi.string(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
