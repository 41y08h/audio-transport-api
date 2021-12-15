import { RequestHandler } from "express";
import Joi from "joi";
import { UniqueViolationError } from "objection";
import Handshake from "../../db/models/Handshake";
import Peer from "../../db/models/Peer";
import User from "../../db/models/User";

interface BodyInput {
  username: string;
}

const offer: RequestHandler = async (req, res) => {
  const user = req.user as User;

  const { username } = req.ctx.getBody<BodyInput>({
    username: Joi.string().required(),
  });

  if (username === req.user.username)
    return req.ctx.error("You can't offer yourself", 400);

  const offerToUser = await User.query().findOne({ username });
  if (!offerToUser) return req.ctx.error("Username not found", 404);

  try {
    // Check if the user already has already been offered
    const existingHandshake = await Handshake.query().findOne({
      toUserId: user.id,
    });
    if (existingHandshake)
      return req.ctx.error("You already have an offer from this user", 409);

    // Check if already paired
    const isAlreadyPaired = await Peer.query()
      .select()
      .where({ userId: offerToUser.id })
      .orWhere({ peerId: user.id });
    if (isAlreadyPaired)
      return req.ctx.error("You are already paired with this user", 409);

    const handshake = await Handshake.query()
      .insertAndFetch({ fromUserId: user.id, toUserId: offerToUser.id })
      .withGraphFetched("[fromUser(defaultSelects), toUser(defaultSelects)]");

    res.status(201).json(handshake);
  } catch (e) {
    if (e instanceof UniqueViolationError) {
      return req.ctx.error("Handshake already exists", 409);
    } else throw e;
  }
};

export default offer;
