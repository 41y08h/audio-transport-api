import { RequestHandler } from "express";
import Joi from "joi";
import knex from "../../db/knex";
import Handshake from "../../db/models/Handshake";
import Peer from "../../db/models/Peer";
import User from "../../db/models/User";

const answer: RequestHandler = async (req, res) => {
  const { username } = req.ctx.getBody<{ username: string }>({
    username: Joi.string().required(),
  });

  const answeringUser = await User.query().findOne({ username });
  if (!answeringUser) return req.ctx.error("User not found", 404);

  const handshake = await Handshake.query().findOne({
    fromUserId: answeringUser.id,
    toUserId: req.user.id,
  });
  if (!handshake) return req.ctx.error("Handshake not found", 404);

  // Remove from handshakes and create peer
  return knex.transaction(async (trx) => {
    await Handshake.query()
      .transacting(trx)
      .delete()
      .where({ fromUserId: answeringUser.id, toUserId: req.user.id });
    const peer = await Peer.query()
      .transacting(trx)
      .insertAndFetch({ userId: answeringUser.id, peerId: req.user.id })
      .withGraphFetched("[user(defaultSelects), peer(defaultSelects)]");

    res.status(201).json(peer);
  });
};

export default answer;
