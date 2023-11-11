import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./jwtGuard";

export const userGuard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const uid = Number(req.params.user);

  if (user?.id != uid) {
    return res
      .status(401)
      .json({
        err: "User is attempting to access the session history of another user",
      });
  } else {
    next();
  }
};
