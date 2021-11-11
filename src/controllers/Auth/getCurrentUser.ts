import { RequestHandler } from "express";
import authenticate from "../../middlewares/authenticate";

const getCurrentUser: RequestHandler = async (req, res) => {
  req.ctx.executeMiddleware(authenticate);

  res.json(req.user);
};

export default getCurrentUser;
