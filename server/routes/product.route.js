const router = require("express").Router();
const productController = require("../controllers/product.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");
const uploader = require("../configs/cloudinary.config.js");

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProduct);

router.use(verifyAccessToken);
router.put("/ratings", productController.ratings);
router.use(isAdmin);
router.post("/", productController.createProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);
router.put("/uploadimage/:pid", uploader.array("images", 10), productController.uploadImageProduct);

module.exports = router;
