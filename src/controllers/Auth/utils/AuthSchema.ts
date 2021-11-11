import Joi from "joi";

const AuthSchema = {
  username: Joi.string().min(3).required().label("Username"),
  password: Joi.string().min(8).required().label("Password"),
};

export default AuthSchema;
