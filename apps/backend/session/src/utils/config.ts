// Sets the database and server environment to run from
import dotEnv from "dotenv";
dotEnv.config();

export const PORT = Number(process.env.PORT);
export const WEBSOCKET_PORT = Number(process.env.WEBSOCKET_PORT);
export const MONGODB_URI = String(process.env.MONGODB_URI);