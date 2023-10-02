import {app} from "./app";
import http from "http";
import * as logger from "./utils/logger";
import * as config from "./utils/config";

const server = http.createServer(app);

server.listen(Number(config.PORT), '::', () => {
  logger.info(`Server running on port ${config.PORT}`);
});
