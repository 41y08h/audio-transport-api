import User from "../../../db/models/User";

export default async function isUsernameAvailable(username: string) {
  const user = await User.query().findOne({ username });
  const isAvailable = Boolean(user) === false;

  return isAvailable;
}
