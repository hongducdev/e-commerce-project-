const router = require("express").Router();
const blogController = require("../controllers/blog.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.get("/", blogController.getBlogs);
router.get("/one/:bid", blogController.getBlog);
router.use(verifyAccessToken);
router.put("/like/:bid", blogController.likeBlog);
router.put("/dislike/:bid", blogController.dislikeBlog);
router.use(isAdmin);
router.post("/", blogController.createBlog);
router.put("/update/:bid", blogController.updateBlog);
router.delete("/delete/:bid", blogController.deleteBlog);

module.exports = router;
