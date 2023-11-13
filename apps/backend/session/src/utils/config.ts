// Sets the database and server environment to run from
import dotEnv from "dotenv";
dotEnv.config();

export const SESSION_PORT = Number(process.env.SESSION_PORT);
export const WS_PORT = Number(process.env.WS_PORT);
export const CHAT_URL = String(process.env.CHAT_URL);
export const QUESTION_URL = String(process.env.QUESTION_URL);
export const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
