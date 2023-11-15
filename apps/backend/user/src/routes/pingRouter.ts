import express, { Router } from "express";
import PingController from "../controllers/pingController";

class PingRouter {
  router: Router;
  pingController: PingController;

  constructor() {
    this.router = express.Router();
    this.pingController = new PingController();
  }

  routes() {
    this.router.get("/", this.pingController.ping);
    return this.router;
  }
}

export default PingRouter;
