const blogCategory = require("../models/blogCategory.model.js");
const asyncHandler = require("express-async-handler");

const createBlogCategory = asyncHandler(async (req, res) => {
  const response = await blogCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlogCategory: response
      ? response
      : "Can not create product category",
  });
});

const getBlogCategories = asyncHandler(async (req, res) => {
  const response = await blogCategory.find({}).select("_id, title");
  return res.status(200).json({
    success: response ? true : false,
    productCategories: response ? response : "Can not get product categories",
  });
});

const updateBlogCategory = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await blogCategory.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedBlogCategory: response
      ? response
      : "Can not update product category",
  });
});
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await blogCategory.findByIdAndDelete(bid);
  return res.status(200).json({
    success: response ? true : false,
    updatedBlogCategory: response
      ? response
      : "Can not delete product category",
  });
});

module.exports = {
  createBlogCategory,
  getBlogCategories,
  updateBlogCategory,
  deleteBlogCategory,
};
