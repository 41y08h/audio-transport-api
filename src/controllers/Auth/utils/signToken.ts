import jwt from "jsonwebtoken";

export default function signToken(username: string) {
  return jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
}
