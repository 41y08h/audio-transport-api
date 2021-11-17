import User from "../../db/models/User";
import AuthSchema from "./utils/AuthSchema";
import isPasswordValid from "./utils/isPasswordValid";
import signToken from "./utils/signToken";
import { RequestHandler } from "express";

interface BodyInput {
  username: string;
  password: string;
}

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.ctx.getBody<BodyInput>(AuthSchema);

  const user = await User.query().findOne({ username });

  if (!user || !isPasswordValid(password, user.password))
    return req.ctx.error("Invalid username or password", 422);

  // Validation complete, grant access
  // Send a session only token
  res.cookie("token", signToken(user.username)).json({
    ...user,
    password: undefined,
  });
};

export default login;
