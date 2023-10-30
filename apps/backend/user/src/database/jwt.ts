import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOptions {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: "7d",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS
) {
  const secret = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret!, options);
  return token;
}

export function verifyJwtToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET_KEY;
    const payload = jwt.verify(token, secret!);
    return payload as JwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
