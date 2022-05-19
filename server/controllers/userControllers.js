require("dotenv").config();
const debug = require("debug")("series:users:server:controllers");
const jsonwebtoken = require("jsonwebtoken");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const User = require("../../db/models/User");

const userLogin = async (req, res, next) => {
  const { username, password } = await req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("username or password invalid");
    error.statusCode = 403;
    error.customMessage = "username or password invalid";
    next(error);
  }
  const UserData = {
    username: user.username,
  };

  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    debug(chalk.redBright("username or password invalid"));
    const error = new Error("username or password invalid");
    error.statusCode = 403;
    next(error);
  } else {
    const token = jsonwebtoken.sign(UserData, process.env.JWT_SECRET);
    res.status(200).json(token);
  }
};

const userRegister = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    const error = await new Error("User already exists");
    error.statusCode = 409;
    error.customMessage = "User already exists";

    next(error);
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const userData = await User.create({
      username,
      password: encryptedPassword,
    });

    res
      .status(201)
      .json({ userData: { username: userData.username, id: userData.id } });
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "Wrong user data";
  }
};

module.exports = { userLogin, userRegister };
