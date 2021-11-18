import Controller from "../../utils/Controller";
import getAllOffers from "./getAllOffers";
import offer from "./offer";

const HandshakesController = Controller({
  offer,
  getAllOffers,
});

export default HandshakesController;
