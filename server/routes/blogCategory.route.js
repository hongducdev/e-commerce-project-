const router = require("express").Router();
const blogCategoryController = require("../controllers/blogCategory.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.use(verifyAccessToken);
router.use(isAdmin);
router.post("/", blogCategoryController.createBlogCategory);
router.get("/", blogCategoryController.getBlogCategories);
router.put("/:bid", blogCategoryController.createBlogCategory);
router.delete("/:bid", blogCategoryController.deleteBlogCategory);

module.exports = router;
