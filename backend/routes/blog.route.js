const {
  GetBlog,
  CreateBlog,
  DeleteBlog,
  GetBlogs,
  GetMyBlogs,
} = require("../controllers/blog.controller");
const { asyncError } = require("../error/error");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer/multer");

const router = require("express").Router();

router.post(
  "/",
  isAuthenticated,
  upload.single("poster"),
  asyncError(CreateBlog)
);
router.delete("/", isAuthenticated, asyncError(DeleteBlog));
router.get("/", asyncError(GetBlogs));
router.get("/mine", isAuthenticated, asyncError(GetMyBlogs));
router.get("/details/:code", asyncError(GetBlog));

module.exports = router;
