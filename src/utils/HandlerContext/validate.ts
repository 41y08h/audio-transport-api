import Joi from "joi";
import HandlerContextError from "./HandlerContextError";

export default function validate<Schema, Object>(
  schema: Schema,
  object: Object
) {
  const { error: validationError } = Joi.object(schema).validate(object, {
    errors: { wrap: { label: "" } },
  });

  if (validationError)
    throw new HandlerContextError(validationError.message, 422);

  return object;
}
