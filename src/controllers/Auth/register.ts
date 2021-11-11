import { RequestHandler } from "express";
import User from "../../entity/User";
import AuthSchema from "./utils/AuthSchema";
import hashPassword from "./utils/hashPassword";
import isUsernameAvailable from "./utils/isUsernameAvailable";
import signToken from "./utils/signToken";

interface BodyInput {
  username: string;
  password: string;
}

const register: RequestHandler = async (req, res) => {
  const { username, password } = req.ctx.getBody<BodyInput>(AuthSchema);

  const isAvailable = await isUsernameAvailable(username);
  if (!isAvailable) return req.ctx.error("Username not available", 422);

  const user = new User();
  user.username = username;
  user.password = hashPassword(password);
  await user.save();

  const token = signToken(user.username);

  return res
    .status(201)
    .cookie("token", token)
    .json({ id: user.id, username, createdAt: user.createdAt });
};

export default register;
