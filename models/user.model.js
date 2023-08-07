const mongoose = require("../mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  osu_username: String,
  osu_user_id: String,
  discord_user: String,
});

const userModel = model("User", userSchema);

module.exports = { userModel };