const userRoute = require("./user.route.js");
const {
  notFound,
  errorHandler,
} = require("../middlewares/errorHandler.middleware.js");

const initRoutes = (app) => {
  app.use("/api/user", userRoute);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
