const app = require("./app");
const http = require("http");
import * as logger from "./utils/logger";
import * as config from "./utils/config";

const server = http.createServer(app);

// Port uses 8000 as set in .env
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
