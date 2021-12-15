import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import HandlerContextError from "./HandlerContextError";
import validate from "./validate";

function HandlerContext(req: Request, res: Response, next: NextFunction) {
  function getBody<Body>(
    updater:
      | Joi.PartialSchemaMap<Body>
      | ((joi: typeof Joi) => Joi.PartialSchemaMap<Body>)
  ) {
    const schema = typeof updater === "function" ? updater(Joi) : updater;

    const body = validate<typeof schema, Body>(schema, req.body);
    return body;
  }

  function getQuery<Query>(
    updater:
      | Joi.PartialSchemaMap<Query>
      | ((joi: typeof Joi) => Joi.PartialSchemaMap<Query>)
  ) {
    const schema = typeof updater === "function" ? updater(Joi) : updater;
    const query = validate<typeof schema, Query>(schema, req.query as any);
    return query;
  }

  function error(message: string, code = 400) {
    throw new HandlerContextError(message, code);
  }

  return { getBody, getQuery, error };
}

export default HandlerContext;
