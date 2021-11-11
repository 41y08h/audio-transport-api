import { Router } from "express";
import AuthController from "../controllers/Auth";

const router = Router();

router.get("/validate-username", AuthController.validateUsername);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/current-user", AuthController.getCurrentUser);

export default router;
