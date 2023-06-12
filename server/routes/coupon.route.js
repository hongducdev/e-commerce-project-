const router = require("express").Router();
const couponController = require("../controllers/coupon.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.use(verifyAccessToken);
router.use(isAdmin);

router.post("/", couponController.createCoupon);
router.get("/", couponController.getCoupons);
router.put("/:bid", couponController.updateCoupon);
router.delete("/:bid", couponController.deleteCoupon);

module.exports = router;