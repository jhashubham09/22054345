const app = require("./src/app");
const config = require("./src/config");
const { logger } = require("./src/utils/logger");

// Start the server
app.listen(config.PORT, () => {
  logger.info(`Average Calculator Microservice running on port ${config.PORT}`);
});
