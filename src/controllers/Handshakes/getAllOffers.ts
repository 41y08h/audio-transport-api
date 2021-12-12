import { RequestHandler } from "express";
import Handshake from "../../db/models/Handshake";

const getAllOffers: RequestHandler = async (req, res) => {
  const handshakes = await Handshake.query()
    .where({ fromUserId: req.user.id })
    .orWhere({ toUserId: req.user.id })
    .withGraphFetched("fromUser(defaultSelects)")
    .withGraphFetched("toUser(defaultSelects)");

  res.json(handshakes);
};

export default getAllOffers;
