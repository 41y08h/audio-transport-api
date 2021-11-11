import User from "../../../entity/User";

export default async function isUsernameAvailable(username: string) {
  const user = await User.findOne({ username });
  const isAvailable = Boolean(user) === false;

  return isAvailable;
}
