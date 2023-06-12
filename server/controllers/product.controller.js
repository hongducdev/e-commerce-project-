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
  const queries = { ...req.query };

  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatedQueries = JSON.parse(queryString);

  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Product.find(formatedQueries);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);

  queryCommand.exec(async (err, products) => {
    if (err) throw new Error(err);
    const counts = await Product.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: products ? true : false,
      counts,
      productData: products ? products : "No product found",
    });
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

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;

  if (!star || !pid) {
    throw new Error("Star or product id is empty");
  }

  const ratingProduct = await Product.findById(pid);
  const alreadyRated = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  if (alreadyRated) {
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRated },
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
        },
      },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: {
          ratings: {
            star,
            comment,
            postedBy: _id,
          },
        },
      },
      { new: true }
    );
  }

  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct?.ratings?.length;
  const ratingSum = updatedProduct?.ratings?.reduce(
    (acc, el) => acc + +el.star,
    0
  );
  const ratingAverage = Math.round((ratingSum * 10) / ratingCount) / 10;
  updatedProduct.totalRatings = ratingAverage;

  await updatedProduct.save();

  return res.status(200).json({
    success: true,
    updatedProduct,
  });
});

const uploadImageProduct = asyncHandler(async (req, res) => {
  return res.json({
    success: true,
    message: "Image uploaded",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImageProduct,
};
