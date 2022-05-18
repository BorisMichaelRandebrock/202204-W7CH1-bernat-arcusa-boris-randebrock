const debug = require("debug")("series:server:initialize");
const chalk = require("chalk");
const app = require(".");

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.green(`Server listening on port ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Server error"));

    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`Port ${port} is busy`));
    }
  });
};

module.exports = initializeServer;
