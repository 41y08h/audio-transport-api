import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import HandlerContextError from "./HandlerContextError";
import validate from "./validate";

function HandlerContext(req: Request, res: Response, next: NextFunction) {
  function getBody<Body>(schema: Joi.PartialSchemaMap<Body>) {
    const body = validate<typeof schema, Body>(schema, req.body);
    return body;
  }

  function getQuery<Query>(schema: Joi.PartialSchemaMap<Query>) {
    const query = validate<typeof schema, Query>(schema, req.query as any);
    return query;
  }

  function error(message: string, code = 400) {
    throw new HandlerContextError(message, code);
  }

  return { getBody, getQuery, error };
}

export default HandlerContext;
