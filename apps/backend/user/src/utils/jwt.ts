import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOptions {
  expiresIn?: string | number;
}

const DEFAULT_ACCESS_TOKEN_SIGN_OPTIONS: SignOptions = {
  expiresIn: "15m",
};

const DEFAULT_REFRESH_TOKEN_SIGN_OPTIONS: SignOptions = {
  expiresIn: "7d",
};

export function getJwtErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.name === 'TokenExpiredError') {
      return 'Access token has expired.'
    }
    if (error.name === "JsonWebTokenError") {
      return "Invalid access token.";
    }
  }
  return String(error)
}


export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_ACCESS_TOKEN_SIGN_OPTIONS
) {
  const secret = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret!, options);
  return token;
}

export function signJwtRefreshToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_REFRESH_TOKEN_SIGN_OPTIONS
) {
  const secret = process.env.JWT_REFRESH_SECRET_KEY;
  const token = jwt.sign(payload, secret!, options);
  return token;
}

export function verifyJwtAccessToken(token?: string) {
  // just for development purposes
  if (token === process.env.JWT_STATIC_TOKEN) {
    const payload = {
      id: -99,
      email: 'test@test.com',
      username: 'Test User',
      oauth: [ 'google' ],
      role: 'admin',
      iat: 1699614259,
      exp: 1699615159
    }
    return payload as JwtPayload;
  }
  const secret = process.env.JWT_SECRET_KEY;
  const payload = jwt.verify(token!, secret!);
  return payload as JwtPayload;
}

export function verifyJwtRefreshToken(token?: string) {
  try {
    const secret = process.env.JWT_REFRESH_SECRET_KEY;
    const payload = jwt.verify(token!, secret!);
    return payload as JwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
