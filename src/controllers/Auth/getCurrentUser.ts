import { RequestHandler } from "express";

const getCurrentUser: RequestHandler<any> = async (req, res) => {
  res.json({ ...req.user, password: undefined });
};

export default getCurrentUser;
