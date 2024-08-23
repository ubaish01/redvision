const jwt = require("jsonwebtoken");

const helperFunctions = {
  isTokenValid: (req) => {
    const cookie = req.headers.cookie;
    if (!cookie) return null;
    const token = helperFunctions.extractJwt(cookie);
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return null;
    return decoded._id;
  },

  generateCourseCode: (title) => {
    return title
      .split(" ")
      .reduce((acc, curr) => `${acc}-${curr.toLowerCase()}`);
  },

  extractJwt: (cookie) => {
    let token = cookie?.split("token=");
    if (token) token = token[1];
    if (token) token = token.split(";");
    if (token) token = token[0];

    return token;
  },
  generateS3Filename: (extension) => {
    const filename = `${extension == ".mp4" ? "video" : "file"}${extension}`;
    const randomNumber = Math.random().toFixed(10) * 1000000000;
    const uniquename = `${Date.now()}${randomNumber}${filename}`;
    return uniquename;
  },
};

module.exports = helperFunctions;
