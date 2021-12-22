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
import cookie from "cookie";
import deserializeUser from "./utils/auth/deserializeUser";
import ConnectedClients from "./utils/ConnectedClients";
import { ICallInitData } from "./interfaces/call";
import Peer from "./db/models/Peer";

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

  const io: Server = new Server(server, {
    cors: { origin: process.env.CLIENT_HOSTNAME },
  });
  const connectedClients = new ConnectedClients();

  io.use(async (socket, next) => {
    const existingClient = connectedClients.getBySocketId(socket.id);
    if (existingClient) return next();

    try {
      const { token } = cookie.parse(socket.handshake.headers.cookie || "");
      const user = await deserializeUser(token);
      connectedClients.add(user, socket);
    } catch {
      next();
    }

    next();
  });

  io.on("connection", (socket) => {
    const debug = createDebug("app:signaling");

    console.log("a user connected to web sockets server");

    socket.on("callPeer", async ({ username, signal }: ICallInitData) => {
      const caller = connectedClients.getBySocketId(socket.id);
      const callee = connectedClients.getByUsername(username);

      if (!caller) return socket.disconnect();

      // Stop from calling self
      if (caller.user.id === callee.user.id)
        return socket.emit("error/callPeer", {
          type: "callingSelf",
          message: "You can't call yourself",
        });

      // If no peer
      if (!callee)
        return socket.emit("error/callPeer", {
          type: "peerNotFound",
          message: "Peer not found",
        });

      // Check if callee is paired with caller
      const pair = Peer.query()
        .findOne({ userId: callee.user.id, peerId: caller.user.id })
        .orWhere({ userId: caller.user.id, peerId: callee.user.id });

      if (!pair)
        return socket.emit("error/callPeer", {
          type: "pairNotFound",
          message: "You're not paired with this user",
        });

      // Get signal from callee
      callee.socket.emit("peerIsCalling", {
        username: caller.user.username,
        signal,
      });

      debug(`${caller.user.username} called ${callee.user.username}`);
    });

    socket.once("disconnect", () => {
      connectedClients.remove(socket.id);
    });
  });

  server.listen(PORT, () => {
    debug(`started on PORT ${PORT}`);
  });
}

main();
