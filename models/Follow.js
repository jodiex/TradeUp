const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxLength: 25
  },
  name: {
    type: String,
    required: true,
    maxLength: 22
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = Follow = mongoose.model("follows", FollowSchema);
