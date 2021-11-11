import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../entity/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const parseUser: RequestHandler = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const username = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findOne({ where: { username } });
  }
  next();
};

export default parseUser;
