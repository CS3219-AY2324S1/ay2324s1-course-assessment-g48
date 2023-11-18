// Sets the database and server environment to run from
import dotEnv from "dotenv";
dotEnv.config();

export const PORT = process.env.PORT;
export const RAPID_API_HOST = process.env.RAPID_API_HOST;
export const RAPID_API_KEY = process.env.RAPID_API_KEY;
export const RAPID_API_SUBMISSIONS_URL = process.env.RAPID_API_SUBMISSIONS_URL;
export const HISTORY_URL = process.env.HISTORY_URL;
