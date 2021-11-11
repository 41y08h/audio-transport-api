import { RequestHandler } from "express";
import AuthSchema from "./utils/AuthSchema";
import isUsernameAvailable from "./utils/isUsernameAvailable";

interface QueryInput {
  username: string;
}

const validateUsername: RequestHandler = async (req, res) => {
  const { username } = req.ctx.getQuery<QueryInput>({
    username: AuthSchema.username,
  });

  if (await isUsernameAvailable(username)) res.json({ valid: true });
  else res.status(400).json({ valid: false });
};

export default validateUsername;
