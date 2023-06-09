const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, mobile } = req.body;

  if (!email || !password || !firstName || !lastName || !mobile) {
    res.status(400).json({
      success: false,
      message: "Please fill all the fields!",
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exists!");
  } else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser ? "User created successfully!" : "User creation failed!",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please fill all the fields!",
    });
  }

  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, ...userData } = response.toObject();
    return res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      userData,
    });
  } else {
    throw new Error("Invalid email or password!");
  }
});

module.exports = { register, login };
