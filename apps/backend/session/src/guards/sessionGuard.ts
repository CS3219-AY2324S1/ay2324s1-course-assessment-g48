import axios, { AxiosError } from "axios";
import { Request, Response, NextFunction } from "express";
import { OAuthType } from "../enums/OAuthType.ts";
import { Role } from "../enums/Role.ts";
import SessionModel, { SessionEntity } from "../model/Session.ts";
import { AuthenticatedRequest } from "./jwtGuard.ts";

export interface AuthenticatedRequestWithSession extends AuthenticatedRequest {
  session?: SessionEntity;
}

function getAxiosErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.code === "ECONNREFUSED") {
      return "Unable to connect with user service.";
    }
    return error.response?.data?.error;
  }
  return String(error);
}

const verifyUserInSession = async (sessionId: string, userId: number) => {
  const session = await SessionModel.findById(sessionId);
  if (!session) {
    console.log("No session of this sessionId has been found");
    return { isUserInSession: undefined, session: undefined };
  }
  const isUserInSession: boolean = session.users.includes(userId);
  return { isUserInSession, session };
};

export const sessionGuard = async (
  req: AuthenticatedRequestWithSession,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.params.sessionId;
  if (!sessionId) {
    res.status(401).json({ error: "No sesionId was provided." });
    return;
  }

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not found" });
    }
    const { isUserInSession, session } = await verifyUserInSession(
      sessionId,
      req.user.id
    );
    if (!session) {
      console.log("No session of that sessionId was found.");
      return res
        .status(404)
        .json({ error: "No session of that sessionId was found." });
    }
    if (!isUserInSession) {
      console.log("User is not a part of this session.");
      return res
        .status(401)
        .json({ error: "User is not a part of this session." });
    }
    req.session = session;
    next();
  } catch (error) {
    const errorMessage = getAxiosErrorMessage(error);
    res.status(401).json({ error: errorMessage });
  }
};
