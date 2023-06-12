const router = require("express").Router();
const orderController = require("../controllers/order.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.use(verifyAccessToken);
router.use(isAdmin);
router.post("/", orderController.createOrder);

module.exports = router;
