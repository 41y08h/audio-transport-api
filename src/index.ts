import "dotenv/config";
import createDebug from "debug";
import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import parseUser from "./middlewares/parseUser";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { context, ctxErrors } from "./utils/HandlerContext";
import serverErrors from "./middlewares/serverErrors";

async function main() {
  const debug = createDebug("app");
  const PORT = process.env.PORT || 5000;

  const app = express();
  const server = createServer(app);

  app.use(cookieParser());
  app.use(express.json());
  app.use(context);
  app.use(parseUser);
  app.use(routes);
  app.use(ctxErrors);
  app.use(serverErrors);

  const io: Server = new Server(server);

  app.listen(PORT, () => {
    debug(`started on PORT ${PORT}`);
  });
}

main();
