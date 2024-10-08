const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");

const services = {
  cookieSetter: (res, token, set) => {
    res.setHeader(
      "Set-Cookie",
      serialize("token", set ? token : "", {
        path: "/",
        httpOnly: false,
        maxAge: set ? 30 * 24 * 60 * 60 * 1000 : 0,
      })
    );
  },

  generateToken: (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "365d" });
  },
};

module.exports = services;
