const productCategory = require("../models/productCategory.model.js");
const asyncHandler = require("express-async-handler");

const createProductCategory = asyncHandler(async (req, res) => {
  const response = await productCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdProductCategory: response
      ? response
      : "Can not create product category",
  });
});

const getProductCategories = asyncHandler(async (req, res) => {
  const response = await productCategory.find({});
  return res.status(200).json({
    success: response ? true : false,
    productCategories: response ? response : "Can not get product categories",
  });
});

const updateProductCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await productCategory.findByIdAndUpdate(pcid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedProductCategory: response
      ? response
      : "Can not update product category",
  });
});
const deleteProductCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await productCategory.findByIdAndDelete(pcid);
  return res.status(200).json({
    success: response ? true : false,
    updatedProductCategory: response
      ? response
      : "Can not delete product category",
  });
});

module.exports = {
  createProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
};
