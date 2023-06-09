const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req.header?.authorization?.startWith("Bearer")) {
    const token = req.header.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json({
          success: false,
          message: "Invalid token!",
        });

      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Access token not found!",
    });
  }
});

module.exports = {
  verifyAccessToken,
};
