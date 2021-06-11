import {RequestHandler} from "express";
import jwt from "jsonwebtoken";
import {User} from "../db/users";

const SECRET = "@@#!@#$#!$*!@)#{}:\"ASXASXZZZ777asd00*!@)#!*@#)!@#*!#!@KKK##XXZZ";

const JWTMiddleware: RequestHandler = async (req, res, next) => {

  const token = req.headers.authorization || "";

  const verified = jwt.verify(token, SECRET);

  console.log(verified);
  next();

}


export const createJWT = async (user: User) => {
  const {password, ...payload} = user;
  const issuedJWT = jwt.sign(payload, SECRET);
  return issuedJWT;
}


export default JWTMiddleware;
