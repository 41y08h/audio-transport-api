import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
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
    try {
      const { username } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { username?: string };

      req.user = username
        ? await User.query().findOne({ username })
        : undefined;
    } catch (error) {
      return next();
    }
  }
  next();
};

export default parseUser;
