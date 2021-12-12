import { ErrorRequestHandler } from "express";
import createDebug from "debug";

const handleServerErrors: ErrorRequestHandler = (err, req, res, next) => {
  const debug = createDebug("app:err");

  debug(err.message);

  res.status(500).json({
    error: {
      message: "Server error",
      code: 500,
    },
  });
};

export default handleServerErrors;
