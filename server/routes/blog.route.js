const router = require("express").Router();
const blogController = require("../controllers/blog.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");
const uploader = require("../configs/cloudinary.config.js");

router.get("/", blogController.getBlogs);
router.get("/one/:bid", blogController.getBlog);
router.use(verifyAccessToken);
router.put("/like/:bid", blogController.likeBlog);
router.put("/dislike/:bid", blogController.dislikeBlog);
router.use(isAdmin);
router.post("/", blogController.createBlog);
router.put("/update/:bid", blogController.updateBlog);
router.delete("/delete/:bid", blogController.deleteBlog);
router.put(
  "/uploadimage/:bid",
  uploader.single("image"),
  blogController.uploadImageBlog
);

module.exports = router;
