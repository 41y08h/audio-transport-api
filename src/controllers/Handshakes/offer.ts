import { RequestHandler } from "express";
import Joi from "joi";
import { UniqueViolationError } from "objection";
import Handshake from "../../db/models/Handshake";
import User from "../../db/models/User";

interface BodyInput {
  username: string;
}

const offer: RequestHandler = async (req, res) => {
  const user = req.user as User;

  const { username } = req.ctx.getBody<BodyInput>({
    username: Joi.string().required(),
  });

  const offerToUser = await User.query().findOne({ username });

  if (!offerToUser) {
    return req.ctx.error("Username not found", 404);
  }

  try {
    const handshake = await Handshake.query()
      .insert({
        fromUserId: user.id,
        toUserId: offerToUser.id,
      })
      .returning("*")
      .withGraphFetched("fromUser(selectFields)")
      .withGraphFetched("toUser(selectFields)")
      .modifiers({
        selectFields(builder) {
          builder.select("id", "username");
        },
      });

    res.status(201).json(handshake);
  } catch (e) {
    if (e instanceof UniqueViolationError) {
      return req.ctx.error("Handshake already exists", 409);
    } else throw e;
  }
};

export default offer;
