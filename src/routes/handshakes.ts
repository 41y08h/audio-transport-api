import { Router } from "express";
import HandshakesController from "../controllers/Handshakes";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.post("/offer", authenticate, HandshakesController.offer);

export default router;
