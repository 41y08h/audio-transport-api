import { RequestHandler } from "express";
import User from "../../entity/User";
import authenticate from "../../middlewares/authenticate";

type ResponseJson = Pick<User, "id" | "username" | "createdAt">;

const getCurrentUser: RequestHandler<any, ResponseJson> = async (req, res) => {
  req.ctx.executeMiddleware(authenticate);
  const { id, username, createdAt } = req.user as User;

  res.json({ id, username, createdAt });
};

export default getCurrentUser;
