const { errorHandler } = require("../error/error");
const { generateCourseCode } = require("../helper/helper");
// const { generateCourseCode } = require("../helper/helperFunctions");
const { STATUS, USER_ROLE } = require("../utils/constant");

const mongoose = require("mongoose");
const Blog = mongoose.model("Blog");

module.exports = {
  CreateBlog: async (req, res) => {
    const { title, subtitle, content } = req.body;
    const poster = req?.file?.location;
    const user = req.user;
    console.log(user);
    if (!title || !content || !content || !poster)
      return errorHandler(
        res,
        STATUS.BAD_REQUEST,
        "Please fill all the fields"
      );
    const blog = await Blog.create({
      user: user?._id,
      title,
      subtitle,
      content,
      poster,
      code: generateCourseCode(title),
    });

    return res.json({
      success: true,
      message: "Blog posted successfully",
      blog,
    });
  },

  UpdateBlog: async (req, res) => {
    const { title, subtitle, content, blog_id } = req.body;
    const poster = req?.file?.location || "";
    if (!blog_id)
      return errorHandler(res, STATUS.BAD_REQUEST, "Blog id is required");

    const blog = await Blog.findById(blog_id);
    if (!blog) return errorHandler(res, STATUS.BAD_REQUEST, "Blog not found!");

    if (title) blog.title = title;
    if (subtitle) blog.subtitle = subtitle;
    if (content) blog.content = content;
    if (poster) blog.poster = poster;
    await blog.save();

    return res.json({
      success: true,
      message: "Blog Updated successfully",
      blog,
    });
  },

  DeleteBlog: async (req, res) => {
    const { blog_id } = req.body;
    const user = req.user;
    const blog = await Blog.findById(blog_id);
    if (!blog) return errorHandler(res, STATUS.BAD_REQUEST, "Blog not found!");
    if (blog?.user?.toString() !== user._id?.toString())
      return errorHandler(
        res,
        STATUS.NOT_ALLOWED,
        "You have no delete access for this blog"
      );
    await blog.deleteOne();
    return res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  },

  GetBlogs: async (req, res) => {
    const limit = 20;
    let { search, page } = req.query;
    const regex = new RegExp(search, "i");
    if (!page) page = 1;
    const skip = (page - 1) * limit;
    const filter = { title: regex };

    const blogs = await Blog.find(filter)
      .populate({
        path: "user",
        select: "-password",
      })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    const found_blogs_count = await Blog.countDocuments(filter);
    const available_pages = Math.ceil(
      (await Blog.countDocuments(filter)) / limit
    );

    return res.json({
      found_blogs_count,
      available_pages,
      blogs,
    });
  },
  GetMyBlogs: async (req, res) => {
    const user = req.user;
    const limit = 20;
    let { search, page } = req.query;
    const regex = new RegExp(search, "i");
    if (!page) page = 1;
    const skip = (page - 1) * limit;
    const filter = { user: user._id };

    const blogs = await Blog.find(filter)
      .populate({
        path: "user",
        select: "-password",
      })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    const found_blogs_count = await Blog.countDocuments(filter);
    const available_pages = Math.ceil(
      (await Blog.countDocuments(filter)) / limit
    );

    return res.json({
      found_blogs_count,
      available_pages,
      blogs,
    });
  },

  GetBlog: async (req, res) => {
    const code = req.params.code;
    const blog = await Blog.findOne({ code: code });

    return res.json({
      success: true,
      blog,
    });
  },
};
