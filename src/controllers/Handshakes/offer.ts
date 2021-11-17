import { RequestHandler } from "express";
import Joi from "joi";
import Handshake from "../../entity/Handshake";
import User from "../../entity/User";

interface BodyInput {
  username: string;
}

const offer: RequestHandler = async (req, res) => {
  const user = req.user as User;

  const { username } = req.ctx.getBody<BodyInput>({
    username: Joi.string().required(),
  });

  const offerToUser = await User.findOne({ username });

  if (!offerToUser) {
    return req.ctx.error("Username not found", 404);
  }

  Handshake.
  res.status(201).json(handshake);
};

export default offer;
