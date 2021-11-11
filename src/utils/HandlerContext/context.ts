import { RequestHandler } from "express";
import HandlerContext from ".";

declare global {
  namespace Express {
    interface Request {
      ctx: ReturnType<typeof HandlerContext>;
    }
  }
}

const context: RequestHandler = (req, res, next) => {
  const ctx = HandlerContext(req, res, next);
  req.ctx = ctx;
  next();
};

export default context;
