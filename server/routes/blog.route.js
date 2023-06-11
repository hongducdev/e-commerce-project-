const router = require("express").Router();
const blogController = require("../controllers/blog.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.get("/", blogController.getBlogs);
router.use(verifyAccessToken);
router.put("/like", blogController.likeBlog);
router.use(isAdmin);
router.post("/", blogController.createBlog);
router.put("/:bid", blogController.updateBlog);
router.delete("/:bid", blogController.deleteBlog);

module.exports = router;
