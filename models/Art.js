const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Art Schema
const ArtSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  art: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("arts", ArtSchema);
