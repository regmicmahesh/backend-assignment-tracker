import Joi from "joi";

export const joinTeacherSchema = Joi.object({
  code: Joi.string().required(),
});
