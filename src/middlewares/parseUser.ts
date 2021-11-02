import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import db from "../db";
import IUser from "../interfaces/IUser";

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
    }
  }
}

const parseUser: RequestHandler = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next();
  const username = jwt.verify(token, process.env.JWT_SECRET as string);

  const {
    rows: [user],
  } = await db.query(
    `select id, username, "createdAt" from "User" where username = $1`,
    [username]
  );

  req.currentUser = user;
  next();
};

export default parseUser;
