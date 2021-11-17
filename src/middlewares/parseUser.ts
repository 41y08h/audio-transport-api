import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../db/models/User";

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
    const username = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as string;
    const [user] = await User.query().select().where("username", username);

    req.user = user;
  }
  next();
};

export default parseUser;
