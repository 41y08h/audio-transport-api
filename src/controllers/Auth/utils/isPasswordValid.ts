import bcrypt from "bcrypt";

export default function isPasswordValid(plain: string, hash: string) {
  return bcrypt.compareSync(plain, hash);
}
