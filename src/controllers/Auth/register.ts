import { RequestHandler } from "express";
import User from "../../db/models/User";
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

  const user = await User.query().insert({ username, password }).returning("*");
  const token = signToken(user.username);

  return res
    .status(201)
    .cookie("token", token)
    .json({ id: user.id, username, createdAt: user.createdAt });
};

export default register;
