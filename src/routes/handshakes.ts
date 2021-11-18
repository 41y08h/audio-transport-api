import { Router } from "express";
import HandshakesController from "../controllers/Handshakes";
import authenticate from "../middlewares/authenticate";

const router = Router();

router
  .use(authenticate)
  .route("/offers")
  .get(HandshakesController.getAllOffers)
  .post(HandshakesController.offer);

export default router;
