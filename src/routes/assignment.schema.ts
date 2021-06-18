import joi from "joi";


export const assignmentSchema = joi.object({
  title: joi.string().required().min(3),
  description: joi.string().required().min(3),
})
