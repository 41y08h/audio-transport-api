import { RequestHandler } from "express";
import Peer from "../../db/models/Peer";

const getAllPeers: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  const peers = await Peer.query()
    .where({ userId })
    .orWhere({ peerId: userId })
    .withGraphFetched("user(defaultSelects)")
    .withGraphFetched("peer(defaultSelects)");

  res.json(peers);
};

export default getAllPeers;
