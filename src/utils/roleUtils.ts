import { RequestHandler } from "express";

export const roleMiddleware = (role: "STUDENT" | "TEACHER") => {
  const innerObj: RequestHandler = (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      next(new Error("You do not have access to this resource."));
    }
  };

  return innerObj;
};
