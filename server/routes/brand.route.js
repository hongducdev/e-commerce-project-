const router = require("express").Router();
const brandController = require("../controllers/brand.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.use(verifyAccessToken);
router.use(isAdmin);
router.post("/", brandController.createBrand);
router.get("/", brandController.getBrands);
router.put("/:bid", brandController.updateBrand);
router.delete("/:bid", brandController.deleteBrand);

module.exports = router;