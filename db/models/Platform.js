const { Schema, model } = require("mongoose");

const PlatformSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

const Platform = model("Platform", PlatformSchema, "platforms");

module.exports = Platform;
