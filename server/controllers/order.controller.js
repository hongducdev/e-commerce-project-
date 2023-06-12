const Order = require("../models/order.model.js");
const User = require("../models/user.model.js");
const Coupon = require("../models/coupon.model.js");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");
  const products = userCart.cart.map((item) => ({
    product: item.product._id,
    count: item.quantity,
    color: item.color,
  }));
  let total = userCart.cart.reduce(
    (sum, item) => item.product.price * item.quantity + sum,
    0
  );
  const createData = {
    products,
    total,
    orderBy: _id,
  };
  if (coupon && total) {
    // tìm coupon theo name
    const validCoupon = await Coupon.findOne({ name: coupon });

    total =
      Math.round((total * (1 - +validCoupon.discount / 100)) / 1000) * 1000;
    createData.total = total;
    createData.coupon = validCoupon._id;
  }
  const response = await Order.create(createData);
  return res.json({
    success: response ? true : false,
    response: response ? response : "Order not created",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!oid || !status) throw new Error("Order id and status are required");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    {
      new: true,
    }
  );
  return res.json({
    success: response ? true : false,
    response: response ? response : "Order not updated",
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const response = await Order.find({})
    .populate("orderBy", "name email")
    .sort("-createdAt");
  return res.json({
    success: response ? true : false,
    response: response ? response : "Order not found",
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id });
  return res.json({
    success: response ? true : false,
    response: response ? response : "Order not found",
  });
});

module.exports = { createOrder, updateStatus, getOrders, getUserOrder };
