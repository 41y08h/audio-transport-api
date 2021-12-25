import PromiseRouter from "express-promise-router";
import HandshakesController from "../controllers/Handshakes";
import authenticate from "../middlewares/authenticate";

const router = PromiseRouter().use(authenticate);

router.get("/received", HandshakesController.getReceived);
router.get("/sent", HandshakesController.getSent);
router.route("/offers").post(HandshakesController.offer);
router.post("/answer", HandshakesController.answer);

export default router;
