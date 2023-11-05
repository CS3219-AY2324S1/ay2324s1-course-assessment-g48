// Sets the database and server environment to run from
import dotEnv from "dotenv";
dotEnv.config();

export const PORT = Number(process.env.PORT);
export const CHAT_URL = String(process.env.CHAT_URL);
export const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;