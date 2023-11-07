import { Router, Request, Response, NextFunction } from "express";

export const testRouter = Router();

testRouter.get(
  "/",
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "pong" });
  }
);