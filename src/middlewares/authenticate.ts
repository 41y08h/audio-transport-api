import { RequestHandler } from "express";

const authenticate: RequestHandler = (req, res, next) => {
  if (req.currentUser) next();
  else res.status(401).json({ message: "Unauthenticated" });
};

export default authenticate;
