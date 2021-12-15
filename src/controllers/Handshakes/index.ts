import Controller from "../../utils/Controller";
import answer from "./answer";
import getAllOffers from "./getAllOffers";
import offer from "./offer";

const HandshakesController = Controller({
  offer,
  getAllOffers,
  answer,
});

export default HandshakesController;
