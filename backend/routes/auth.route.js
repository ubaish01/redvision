const {
  register,
  login,
  logout,
  getUser,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", getUser);

module.exports = router;
