const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunityFollowSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 25
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

module.exports = CommunityFollow = mongoose.model("communityFollows", CommunityFollowSchema);
