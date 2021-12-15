import jwt from "jsonwebtoken";
import User from "../../db/models/User";

export default async function deserializeUser(token: string) {
  return new Promise<User>(async (resolve) => {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      if (typeof payload === "string") return undefined;

      if ("username" in payload) {
        const user = await User.query().findOne({ username: payload.username });
        resolve(user);
      }
    } catch {
      return resolve(undefined);
    }
  });
}
