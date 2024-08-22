const mongoose = require("mongoose");
const { DEFAULT_USER_AVATAR } = require("../utils/constant");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar:{
        type:String,
        default:DEFAULT_USER_AVATAR
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
