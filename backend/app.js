const { ConnectDatabase } = require("./connection/db");
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");

const cors = require("cors");
dotenv.config();

const app = express();

// ROUTE IMPORTS
const authRouter = require("./routes/auth.route");
const blogRouter = require("./routes/blog.route");

const LOCALHOST = "http://localhost:3000";

// SERVER MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, LOCALHOST],
    method: "GET,POST,DELETE,PUT",
    credentials: true,
  })
);

app.use(
  session({
    secret: "sessionSecret",
    resave: false,
    saveUninitialized: true,
  })
);

// Limit request size using body-parser middleware
app.use(express.json({ limit: "1024mb" }));
app.use(express.urlencoded({ limit: "1024mb" }));

// ROUTES MIDDLESWARES

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);

ConnectDatabase();
module.exports = app;
