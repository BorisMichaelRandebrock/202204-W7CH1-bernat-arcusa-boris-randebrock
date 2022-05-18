const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
