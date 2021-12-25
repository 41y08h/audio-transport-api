import { RequestHandler } from "express";
import Handshake from "../../db/models/Handshake";

const getReceived: RequestHandler = async (req, res) => {
  const handshakes = await Handshake.query()
    .where({ toUserId: req.user.id })
    .withGraphFetched("fromUser(defaultSelects)")
    .withGraphFetched("toUser(defaultSelects)");

  res.json(handshakes);
};

export default getReceived;
