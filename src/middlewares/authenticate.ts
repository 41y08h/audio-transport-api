import { RequestHandler } from "express";

const authenticate: RequestHandler = (req, res, next) => {
  const isAuthenticated = Boolean(req.user);
  if (isAuthenticated) next();
  else req.ctx.error("Unable to proceed as unauthenticated", 401);
};

export default authenticate;
