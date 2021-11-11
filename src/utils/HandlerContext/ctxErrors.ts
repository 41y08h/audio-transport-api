import { ErrorRequestHandler } from "express";
import HandlerContextError from "./HandlerContextError";

const ctxErrors: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HandlerContextError) {
    res.status(err.status).json({
      error: {
        code: err.status,
        message: err.message,
      },
    });
  } else next(err);
};

export default ctxErrors;
