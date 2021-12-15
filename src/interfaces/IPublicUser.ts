import User from "../db/models/User";

type IPublicUser = Pick<User, "id" | "username" | "createdAt">;

export default IPublicUser;
