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
    type: String
  },
  phone: {
    type: String
  },
  description: {
    type: String
  },
  tags: {
    type: [String],
    required: true
  },
  art: {
    type: String,
    required: true
  },
  imagename: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "requested"
  },
  isRejected: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("arts", ArtSchema);
