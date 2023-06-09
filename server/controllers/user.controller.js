const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({
      success: false,
      message: "Please fill all the fields!",
    });
  }

  const response = await User.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? "User created successfully!" : "User creation failed!",
    response,
  });
});

module.exports = { register };
