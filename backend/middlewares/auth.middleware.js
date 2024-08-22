const { errorHandler } = require("../error/error");
const { USER_ROLE, STATUS, RESPONSE_INFO } = require("../utils/constant");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const { isTokenValid, extractJwt } = require("../helper/helper");

const authMiddleware = {
  isAuthenticated: async (req, res, next) => {
    try {
      const userId = isTokenValid(req);
      //   console.log(userId);
      if (!userId)
        return res.status(STATUS.UNAUTHORIZED).json({
          success: false,
          message: "You are not logged in.",
          response_info: RESPONSE_INFO.TOKEN_ERROR,
        });

      const user = await User.findById(userId);
      if (!user)
        return res.status(STATUS.UNAUTHORIZED).json({
          success: false,
          message: "You are not logged in.",
          response_info: RESPONSE_INFO.TOKEN_ERROR,
        });
      req.user = user;
      next();
    } catch (error) {
      return res.status(STATUS.UNAUTHORIZED).json({
        success: false,
        message: "You are not authenticated",
        response_info: RESPONSE_INFO.TOKEN_ERROR,
      });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const cookie = req.headers.cookie;
      if (!cookie)
        return errorHandler(
          res,
          STATUS.UNAUTHORIZED,
          "You are not authenticated"
        );

      const token = extractJwt(cookie);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded._id);
      if (!user)
        return errorHandler(res, STATUS.NOT_ALLOWED, "Token is not valid");

      if (user.role !== USER_ROLE.ADMIN)
        return errorHandler(
          res,
          STATUS.NOT_ALLOWED,
          "You are not allowed to use this route"
        );
      req.user = user;
      next();
    } catch (error) {
      return errorHandler(
        res,
        STATUS.UNAUTHORIZED,
        "You are not authenticated"
      );
    }
  },
};

module.exports = authMiddleware;
