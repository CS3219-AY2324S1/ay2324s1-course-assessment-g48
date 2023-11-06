import { Request, Response } from "express";

class PingController {
  ping(req: Request, res: Response) {
    res.status(200).json({ message: "pong" });
  }
}

export default PingController;
