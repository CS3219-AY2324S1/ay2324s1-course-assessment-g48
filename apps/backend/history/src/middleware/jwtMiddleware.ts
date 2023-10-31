import axios, { AxiosError } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { OAuthType } from '../models/enum/OAuthType';
import { Role } from "../models/enum/Role";

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
    if (error.code === 'ECONNREFUSED') {
      return 'Unable to connect with user service.'
    }
    return error.response?.data?.error
  }
  return error
}

const verifyJwtToken = async (token?: string) => {
  const response = await axios.get(process.env.USER_SERVICE_URL + "/api/users/verifyJwt", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const jwtMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    res.status(401).json({ error: "No JWT token was provided." });
    return;
  }

  try {
    req.user = await verifyJwtToken(accessToken);
    next();
  } catch (error) {
    res.status(401).json({ error: getAxiosErrorMessage(error) });
  }
};