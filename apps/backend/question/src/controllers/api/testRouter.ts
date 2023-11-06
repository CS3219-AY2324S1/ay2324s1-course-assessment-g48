import { Router, Request, Response } from "express";// Checks if server is running

export const testRouter = Router();

testRouter.get(
  "/",
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "pong" });
  }
);