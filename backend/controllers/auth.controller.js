const { asyncError, errorHandler } = require("../error/error");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { generateToken, cookieSetter } = require("../helper/service.js");
const { STATUS } = require("../utils/constant");

const User = mongoose.model("User");

const AuthContollers = {
  register: asyncError(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName)
      return errorHandler(
        res,
        STATUS.OK,
        "Name, email and password is required"
      );

    const name = firstName + " " + lastName;

    const userFound = await User.findOne({
      email: email.toLowerCase(),
    });

    if (userFound) return errorHandler(res, 400, "Email already exists");

    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name: name?.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const { password: pwd, ...rest } = user._doc;

    await user.save();

    // generating access token for authentication
    const access_token = generateToken(user._id);
    cookieSetter(res, access_token, true);

    return res.status(201).json({
      success: true,
      user: { _id: user._id, email, name: user.name, avatar: user.avatar },
      token: access_token,
      message: "Account created successfully",
    });
  }),

  login: asyncError(async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({
      email: email?.toLowerCase(),
    });
    if (!foundUser) return errorHandler(res, 404, "User not found");

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch)
      return errorHandler(res, 401, "Invalid email or password!");

    const { password: pwd, ...rest } = foundUser._doc;

    const access_token = generateToken(foundUser._id);
    cookieSetter(res, access_token, true);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...rest,
      },
      access_token,
    });
  }),

  logout: asyncError(async (req, res) => {
    cookieSetter(res, null, false);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }),

  getUser: asyncError(async (req, res) => {
    if (req.user) {
      const foundUser = await User.findById(req.user._id);
      if (!foundUser) return errorHandler(res, 404, "User not found");

      const { password: pwd, ...rest } = foundUser._doc;

      const access_token = generateToken(foundUser._id);
      cookieSetter(res, access_token, true);

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: {
          ...rest,
        },
        access_token,
      });
    } else {
      return errorHandler(res, 403, "You are not authenticated");
    }
  }),
};

module.exports = AuthContollers;
