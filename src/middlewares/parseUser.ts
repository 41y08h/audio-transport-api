import { RequestHandler } from "express";
import User from "../db/models/User";
import deserializeUser from "../utils/auth/deserializeUser";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const parseUser: RequestHandler = async (req, res, next) => {
  const { token } = req.cookies;
  req.user = token && (await deserializeUser(token));

  next();
};

export default parseUser;
