import bcrypt from "bcrypt";

export default function hashPassword(plainPassowrd: string) {
  return bcrypt.hashSync(plainPassowrd, 10);
}
