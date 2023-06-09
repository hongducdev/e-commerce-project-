const userRoute = require("./user.route.js");

const initRoutes = (app) => {
  app.use("/api/user", userRoute);
};

module.exports = initRoutes;