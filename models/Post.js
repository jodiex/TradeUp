const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxLength: 25
  },
  author: {
    type: String,
    required: true,
    maxLength: 25
  },
  authorName: {
    type: String,
    required: true,
    maxLength: 22
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
  },
  reshared: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
