require("dotenv").config();
const User = require("../../db/models/User");

const userLogin = async (req, res, next) => {
  const { username } = await req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("User or Password invalid");
    error.statusCode = 403;
    error.customMessage = "User or Password invalid";
    next(error);
  }
};

module.exports = { userLogin };
