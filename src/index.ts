import "dotenv/config";
import "reflect-metadata";
import createDebug from "debug";
import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import parseUser from "./middlewares/parseUser";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import routes from "./routes";
import { context, ctxErrors } from "./utils/HandlerContext";

async function main() {
  const debug = createDebug("app");
  const PORT = process.env.PORT || 5000;

  const app = express();
  const server = createServer(app);

  createConnection();

  app.use(cookieParser());
  app.use(express.json());
  app.use(context);
  app.use(parseUser);
  app.use(routes);
  app.use(ctxErrors);

  const io: Server = new Server(server);

  app.listen(PORT, () => {
    debug(`Service started on PORT ${PORT}`);
  });
}

main();
