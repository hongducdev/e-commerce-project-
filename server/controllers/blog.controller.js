const Blog = require("../models/blog.model.js");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    throw new Error("Please fill all the fields");
  }

  const response = await Blog.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot create blog",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Please fill all the fields");
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    updatedBlog: response ? response : "Cannot update blog",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.json({
    success: response ? true : false,
    blogs: response ? response : "Cannot get blogs",
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndDelete(bid);
  return res.json({
    success: response ? true : false,
    deletedBlog: response ? response : "Cannot delete blog",
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Please provide blog id");
  const blog = await Blog.findById(bid);

  const alreadyDisliked = blog?.dislikes?.find(
    (dislike) => dislike.toString() === _id
  );
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { dislikes: _id },
        isDisliked: false,
      },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      updatedBlog: response ? response : "Cannot update blog",
    });
  }

  const isLiked = blog.isLiked;
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: _id },
        isLiked: false,
      },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      updatedBlog: response ? response : "Cannot update blog",
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $push: { likes: _id },
        isLiked: true,
      },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      updatedBlog: response ? response : "Cannot update blog",
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Please provide blog id");
  const blog = await Blog.findById(bid);

  const alreadyLiked = blog?.likes?.find((like) => like.toString() === _id);
  if (alreadyLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: _id },
        isLiked: false,
      },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      updatedBlog: response ? response : "Cannot update blog",
    });
  }

  const isDisliked = blog.isDisliked;
  if (isDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { dislikes: _id },
        isDisliked: false,
      },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      updatedBlog: response ? response : "Cannot update blog",
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $push: { dislikes: _id },
        isDisliked: true,
      },

      { new: true }
    );
    return res.json({
      success: response ? true : false,
      updatedBlog: response ? response : "Cannot update blog",
    });
  }
});

const excludeFields = "firstName lastName email";

const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(bid, {
    $inc: { numberViews: 1 },
  },
  { new: true })
    .populate("likes", excludeFields)
    .populate("dislikes", excludeFields);

  return res.json({
    success: blog ? true : false,
    blog: blog ? blog : "Cannot get blog",
  });
});

module.exports = {
  createBlog,
  updateBlog,
  getBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  getBlog,
};
