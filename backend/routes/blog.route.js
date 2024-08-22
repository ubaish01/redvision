const {
  GetBlog,
  CreateBlog,
  DeleteBlog,
  GetBlogs,
} = require("../controllers/blog.controller");
const { asyncError } = require("../error/error");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/", isAuthenticated, asyncError(CreateBlog));
router.delete("/", isAuthenticated, asyncError(DeleteBlog));
router.get("/", asyncError(GetBlogs));
router.get("/:id", asyncError(GetBlog));

module.exports = router;
