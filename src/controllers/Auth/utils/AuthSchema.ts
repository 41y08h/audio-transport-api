import Joi from "joi";

const AuthSchema = {
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
};

export default AuthSchema;
