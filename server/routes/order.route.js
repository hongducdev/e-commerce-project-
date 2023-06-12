const router = require("express").Router();
const orderController = require("../controllers/order.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.use(verifyAccessToken);
router.post("/", orderController.createOrder);
router.get("/", orderController.getUserOrder);
router.use(isAdmin);
router.put("/status/:oid", orderController.updateStatus);
router.get("/all", orderController.getOrders);

module.exports = router;
