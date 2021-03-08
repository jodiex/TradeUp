const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'posts',
    required: true
  },
  likedBy: {
    type: String,
    required: true,
    maxLength: 25
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = Like = mongoose.model("likes", LikeSchema);
