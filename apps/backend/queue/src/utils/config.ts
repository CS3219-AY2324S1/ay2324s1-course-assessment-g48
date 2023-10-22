// Sets the database and server environment to run from
import dotEnv from "dotenv";
dotEnv.config();

export const PORT = Number(process.env.PORT);
export const SESSION_URL = String(process.env.SESSION_URL);
