import "dotenv/config";
import createDebug from "debug";
import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import db from "./db";
import jwt from "jsonwebtoken";

async function isUsernameValid(username: any) {
  if (!username || typeof username !== "string" || username.length < 3)
    return false;

  const {
    rows: [existingUser],
  } = await db.query('select * from "User" where username = $1', [
    username.trim(),
  ]);

  return !existingUser;
}

async function main() {
  const debug = createDebug("app");
  const PORT = process.env.PORT || 5000;

  const app = express();
  const server = createServer(app);

  app.use(express.json());

  app.get("/validate-username", async (req, res) => {
    const { username } = req.query;

    if (await isUsernameValid(username)) res.json({ valid: true });
    else res.status(400).json({ valid: false });
  });

  app.post("/register", async (req, res) => {
    const { username } = req.body;

    const isValid = await isUsernameValid(username);
    if (!isValid) return res.status(400).json({ message: "Invalid username" });

    // Register user
    const {
      rows: [user],
    } = await db.query(`insert into "User"(username) values ($1) returning *`, [
      username,
    ]);

    return res
      .status(201)
      .cookie(
        "token",
        jwt.sign(user.username, process.env.JWT_SECRET as string)
      )
      .json(user);
  });

  const io: Server = new Server(server);

  app.listen(PORT, () => {
    debug(`Service started on PORT ${PORT}`);
  });
}

main();
