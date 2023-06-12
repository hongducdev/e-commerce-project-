const userRoute = require("./user.route.js");
const productRoute = require("./product.route.js");
const productCategoryRoute = require("./productCategory.route.js");
const blogCategoryRoute = require("./blogCategory.route.js");
const blogRoute = require("./blog.route.js");
const brandRoute = require("./brand.route.js");
const CouponRoute = require("./coupon.route.js");
const {
  notFound,
  errorHandler,
} = require("../middlewares/errorHandler.middleware.js");

const initRoutes = (app) => {
  app.use("/api/user", userRoute);
  app.use("/api/product", productRoute);
  app.use("/api/productcategory", productCategoryRoute);
  app.use("/api/blogcategory", blogCategoryRoute);
  app.use("/api/blog", blogRoute);
  app.use("/api/brand", brandRoute);
  app.use("/api/coupon", CouponRoute);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
