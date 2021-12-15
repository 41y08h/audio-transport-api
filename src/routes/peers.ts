import { Router } from "express";
import getAllPeers from "../controllers/Peers/getAllPeers";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, getAllPeers);

export default router;
