const router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const {
  verifyAccessToken,
  isAdmin,
} = require("../middlewares/verifyToken.middleware.js");

router.post("/register", userController.register);
router.get("/finalregister/:token", userController.finalRegister);
router.post("/login", userController.login);
router.post("/refreshtoken", userController.refreshAccessToken);
router.get("/logout", userController.logout);
router.post("/forgotpassword", userController.forgotPassword);
router.put("/resetpassword", userController.resetToken);

router.use(verifyAccessToken);

router.get("/current", userController.getCurrent);
router.put("/current", userController.updateUser);
router.put("/address", userController.updateAddress);
router.put("/cart", userController.updateCart);

router.use(isAdmin);

router.get("/", userController.getUsers);
router.delete("/", userController.deleteUser);
router.put("/:uid", userController.updateUserByAdmin);

module.exports = router;
