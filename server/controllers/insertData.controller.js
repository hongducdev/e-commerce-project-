const Product = require("../models/product.model.js");
const productCategory = require("../models/productCategory.model.js");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const data = require("../data/data2.json");
const categoryData = require("../data/cate_brand.js");

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug:
      slugify(product?.name, { lower: true }) +
      Math.round(Math.random() * 1000) +
      "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 1000),
    images: product?.images,
    thumb: product?.thumb,
    totalRatings: Math.round(Math.random() * 5),
    color: product?.variants.find((item) => item?.label === "Color")?.variants,
  });
};

const insertData = asyncHandler(async (req, res) => {
  const promise = [];
  for (let product of data) {
    promise.push(fn(product));
  }
  await Promise.all(promise);
  return res.json({
    success: true,
    message: "Insert data successfully",
  });
});

const fn2 = async (category) => {
  await productCategory.create({
    title: category?.cate,
    brand: category?.brand,
    image: category?.image,
  });
}
const insertCategory = asyncHandler(async (req, res) => {
  const promise = [];
  for (let category of categoryData) {
    promise.push(fn2(category));
  }
  await Promise.all(promise);
  return res.json({
    success: true,
    message: "Insert category successfully",
  });
});

module.exports = { insertData, insertCategory };
