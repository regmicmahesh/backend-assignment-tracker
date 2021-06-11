import {RequestHandler} from "express";
import Joi from "joi";
import {createUser, getUser, User} from "../db/users";
import {createJWT} from "../middleware/jwtToken";
import {constructErrorJSON} from "../utils/getErrorMessage";
import {comparePassword, hashPassword} from "../utils/passwordUtils";

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).max(512).required(),
})

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).max(512).required(),
  role: Joi.string().valid('STUDENT', 'TEACHER').required()
})

export const loginController: RequestHandler = async (req, res, next) => {

  console.log(req.body);

  const {value, error} = loginSchema.validate(req.body);

  if (error) {
    const errorPayload = constructErrorJSON(error);
    return res.status(400).statusson(errorPayload)

  }

  const user = await getUser(value.username);
  if (!user) {
    return res.status(400).json({error: "Invalid Username or Password"})
  }

  const valid = await comparePassword(user.password, value.password);

  if (valid) {

    const jwt = await createJWT(user);
    return res.json({message: "", access_token: jwt})

  } else {
    res.status(400).json({error: "Invalid Username or Password"})
  }

}


export const registerController: RequestHandler = async (req, res, next) => {

  console.log(req.body);

  const {value, error} = registerSchema.validate(req.body, {abortEarly: false});

  if (error) {
    const errorPayload = constructErrorJSON(error);
    return res.status(400).json(errorPayload)
  }

  const user = await getUser(value.username);

  if (user) {
    return res.status(400).json({error: "User already exists."})
  }

  value.password = await hashPassword(value.password)

  const createdUser = await createUser(value as User);

  res.json({message: "Registration Successful", ...createdUser})


}
