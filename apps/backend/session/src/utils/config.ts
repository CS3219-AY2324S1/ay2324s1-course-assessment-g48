// Sets the database and server environment to run from
import dotEnv from "dotenv";
dotEnv.config();

export const PORT = Number(process.env.PORT);
export const WEBSOCKET_PORT = Number(process.env.WEBSOCKET_PORT);
export const HOST = process.env.HOST;
