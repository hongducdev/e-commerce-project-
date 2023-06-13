const router = require("express").Router();
const productCategoryController = require("../controllers/productCategory.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.get("/", productCategoryController.getProductCategories);
router.use(verifyAccessToken);
router.use(isAdmin);
router.post("/", productCategoryController.createProductCategory);
router.put("/:pcid", productCategoryController.updateProductCategory);
router.delete("/:pcid", productCategoryController.deleteProductCategory);

module.exports = router;
