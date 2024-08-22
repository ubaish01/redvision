//module.exports = { ConnectDatabase }
require("../models/User.model");
require("../models/Blog.model");
const Mongoose = require("mongoose");

const ConnectDatabase = () => {
  if (Mongoose.connection.readyState === 0) {
    Mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Mongoose.connection.on("error", (err) => {
      throw err;
    });

    Mongoose.connection.on("connected", () => {
      console.log("⚡ MongoDB Connected ⚡ ");
    });
  }
};

module.exports = { ConnectDatabase };
