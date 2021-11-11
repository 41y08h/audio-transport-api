import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";

export default function Controller(handlers: Record<string, RequestHandler>) {
  for (const handler in handlers) {
    handlers[handler] = expressAsyncHandler(handlers[handler]);
  }
  return handlers;
}
