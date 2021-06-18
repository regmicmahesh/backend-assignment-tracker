import { ErrorRequestHandler, RequestHandler } from "express";
import { ObjectSchema, ValidationError } from "joi";

export const constructErrorJSON = (errorDetails: ValidationError) => {
  const errorMessages = errorDetails.details;
  const payload = errorMessages.map((el) => ({
    message: el.message,
    key: el.path[0],
  }));
  return payload;
};

export const schemaValidator = (
  schema: ObjectSchema,
  abortEarly: boolean = false
) => {
  const schemaValidatorMiddleware: RequestHandler = async (req, res, next) => {
    const { value, error } = schema.validate(req.body, {
      abortEarly,
      allowUnknown: false,
    });

    if (error) {
      req.schemaError = constructErrorJSON(error);
      return next(new Error("Request Validation Failed"));
    } else {
      req.body = value;
      return next();
    }
  };

  return schemaValidatorMiddleware;
};


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)
  if (req.schemaError) {
    return res.status(400).json({ errors: req.schemaError });
  }

  res.status(400).json({ error: "Something Went Wrong" });
};
