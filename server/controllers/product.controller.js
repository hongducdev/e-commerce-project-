const Product = require("../models/product.model.js");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Product data is empty");
  }
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const newProduct = await Product.create(req.body);

  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "No product created",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) {
    throw new Error("Product id is empty");
  }

  const product = await Product.findById(pid);

  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "No product found",
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  return res.status(200).json({
    success: products ? true : false,
    productData: products ? products : "No product found",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) {
    throw new Error("Product id is empty");
  }
  const deleteProduct = await Product.findByIdAndDelete(pid);

  return res.status(200).json({
    success: deleteProduct ? true : false,
    deleteProduct: deleteProduct ? deleteProduct : "No product deleted",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) {
    throw new Error("Product id is empty");
  }

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: updateProduct ? true : false,
    updateProduct: updateProduct ? updateProduct : "No product updated",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
