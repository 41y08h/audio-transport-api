import PromiseRouter from "express-promise-router";
import HandshakesController from "../controllers/Handshakes";
import authenticate from "../middlewares/authenticate";

const router = PromiseRouter().use(authenticate);

router
  .route("/offers")
  .get(HandshakesController.getAllOffers)
  .post(HandshakesController.offer);

router.post("/answer", HandshakesController.answer);

export default router;
