import { Router } from "express";
import AuthController from "../controllers/Auth";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.get("/validate-username", AuthController.validateUsername);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/current-user", authenticate, AuthController.getCurrentUser);

export default router;
