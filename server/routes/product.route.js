const router = require("express").Router();
const productController = require("../controllers/product.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProduct);

router.use(verifyAccessToken);
router.use(isAdmin);
router.post("/", productController.createProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

module.exports = router;
