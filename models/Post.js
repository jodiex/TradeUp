const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 22
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 25
  },
  tag: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: true,
    maxLength: 240
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
