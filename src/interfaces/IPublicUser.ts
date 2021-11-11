import User from "../entity/User";

type IPublicUser = Pick<User, "id" | "username" | "createdAt">;

export default IPublicUser;
