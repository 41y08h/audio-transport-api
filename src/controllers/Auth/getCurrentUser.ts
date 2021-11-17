import { RequestHandler } from "express";
import User from "../../entity/User";

const getCurrentUser: RequestHandler<any, User> = async (req, res) => {
  res.json(req.user);
};

export default getCurrentUser;
