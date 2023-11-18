import { app } from "./app";
import http from "http";
import * as logger from "./utils/logger";
import * as config from "./utils/config";

const server = http.createServer(app);

// Port uses 8420 as set in .env
server.listen(Number(config.PORT), "::", () => {
  logger.info(`CodeExecution server running on port ${config.PORT}`);
});
