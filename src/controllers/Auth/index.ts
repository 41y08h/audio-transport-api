import validateUsername from "./validateUsername";
import register from "./register";
import login from "./login";
import getCurrentUser from "./getCurrentUser";
import Controller from "../../utils/Controller";

const AuthController = Controller({
  validateUsername,
  register,
  login,
  getCurrentUser,
});

export default AuthController;
