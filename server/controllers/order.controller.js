const Order = require("../models/order.model.js");
const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const userCart = await User.findById(_id).select("cart");

  return res.json(userCart);
});

module.exports = { createOrder };
