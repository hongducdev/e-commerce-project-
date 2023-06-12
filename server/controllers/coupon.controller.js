const Coupon = require("../models/coupon.model.js");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: response ? true : false,
    createdCoupon: response ? response : "Can not create Coupon",
  });
});

const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find({});
  return res.status(200).json({
    success: response ? true : false,
    productCategories: response ? response : "Can not get Coupons",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (req.body.expiry)
    req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
  const response = await Coupon.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedCoupon: response ? response : "Can not update Coupon",
  });
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndDelete(cid);
  return res.status(200).json({
    success: response ? true : false,
    updatedCoupon: response ? response : "Can not delete Coupon",
  });
});

module.exports = {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
