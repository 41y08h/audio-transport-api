import { RequestHandler } from "express";
import AuthSchema from "./utils/AuthSchema";
import isUsernameAvailable from "./utils/isUsernameAvailable";

interface QueryInput {
  username: string;
}

interface ResponseJson {
  valid: boolean;
}

const validateUsername: RequestHandler<any, ResponseJson> = async (
  req,
  res
) => {
  try {
    const { username } = req.ctx.getQuery<QueryInput>({
      username: AuthSchema.username,
    });

    if (await isUsernameAvailable(username)) res.json({ valid: true });
    else res.status(400).json({ valid: false });
  } catch {
    res.json({ valid: false });
  }
};

export default validateUsername;
