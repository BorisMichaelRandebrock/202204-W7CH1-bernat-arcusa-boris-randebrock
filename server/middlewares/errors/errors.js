const debug = require("debug")("series:server:errors");
const chalk = require("chalk");

const notFoundError = (req, res) => {
  res.status(404).json({ msg: "No endpoint found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;
  const errorMessage = error.customMessage ?? "General error";
  debug(chalk.red(errorMessage));
  res.status(statusCode).json(errorMessage);
};

module.exports = { notFoundError, generalError };
