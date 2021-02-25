const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 30
  },
  bio: {
    type: String,
    required: false,
    default: '',
    maxLength: 175
  },
  emojiStatus: {
    type: String,
    required: false,
    default: 'grinning'
  }
});

module.exports = User = mongoose.model("users", UserSchema);
