import Controller from "../../utils/Controller";
import answer from "./answer";
import getReceived from "./getReceived";
import getSent from "./getSent";
import offer from "./offer";

const HandshakesController = Controller({
  offer,
  getReceived,
  getSent,
  answer,
});

export default HandshakesController;
