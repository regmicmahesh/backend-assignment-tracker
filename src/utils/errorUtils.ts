import {ValidationError} from "joi";


export const constructErrorJSON = (errorDetails: ValidationError) => {

  const errorMessages = errorDetails.details;
  const payload = errorMessages.map(el => ({message: el.message, key: el.path[0]}))
  return payload;

}
