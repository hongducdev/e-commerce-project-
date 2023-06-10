const userRoute = require("./user.route.js");
const productRoute = require("./product.route.js");
const {
  notFound,
  errorHandler,
} = require("../middlewares/errorHandler.middleware.js");

const initRoutes = (app) => {
  app.use("/api/user", userRoute);
  app.use("/api/product", productRoute);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
