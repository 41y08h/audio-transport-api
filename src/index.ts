import "dotenv/config";
import createDebug from "debug";
import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import db from "./db";

async function main() {
  const debug = createDebug("app");
  const PORT = process.env.PORT || 5000;

  const app = express();
  const server = createServer(app);

  app.use(express.json());

  app.get("/validate-username", async (req, res) => {
    const { username } = req.query;

    const {
      rows: [existingUser],
    } = await db.query('select * from "User" where username = $1', [
      username?.toString().trim(),
    ]);

    if (existingUser) res.status(400).json({ valid: false });
    else res.json({ valid: true });
  });

  const io: Server = new Server(server);

  app.listen(PORT, () => {
    debug(`Service started on PORT ${PORT}`);
  });
}

main();
