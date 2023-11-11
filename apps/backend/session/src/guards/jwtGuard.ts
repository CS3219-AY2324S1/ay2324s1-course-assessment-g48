import axios, { AxiosError } from "axios";
import { Request, Response, NextFunction } from "express";
import { OAuthType } from "../enums/OAuthType.ts";
import { Role } from "../enums/Role.ts";

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  oauth: OAuthType[];
  role: Role;
  iat: string;
  exp: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
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

const verifyAccessToken = async (accessToken?: string) => {
  const response = await axios.get(
    process.env.USER_SERVICE_URL + "/api/users/verifyJwt",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log("Verified User: ", response.data);
  return response.data;
};

export const jwtGuard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("Checking JWT");
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    res.status(401).json({ error: "No access token was provided." });
    return;
  }

  try {
    req.user = await verifyAccessToken(accessToken);
    console.log(req.user);
    next();
  } catch (error) {
    const errorMessage = getAxiosErrorMessage(error);
    console.log(errorMessage);
    res.status(401).json({ error: errorMessage });
  }
};
