const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const LikeSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  imageId: {
    type: String,
    required: true
  }
});
module.exports = Like = mongoose.model("likes", LikeSchema);
