const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt.middleware.js");
const jwt = require("jsonwebtoken");
const sentMail = require("../ultils/sentMail.js");

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
    // Tách password và role ra khỏi response
    const { password, role, ...userData } = response.toObject();
    // Tạo accessToken và refreshToken
    const accessToken = generateAccessToken(response._id, role);
    const refreshToken = generateRefreshToken(response._id);

    // Lưu refreshToken vào database
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid email or password!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not found",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies;
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Check token có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Xóa refresh token ở db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xóa refresh token ở cookie trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Email is required");
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email is not found");
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `
    <h1>Reset your password</h1>
    <p>Click this <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>link</a> to reset your password</p>
  `;

  const data = {
    email,
    subject: "Reset your password",
    html,
  };

  const rs = await sentMail(data);
  return res.status(200).json({
    success: true,
    rs,
  });
});

const resetToken = asyncHandler(async (req, res) => {
  // const { token } = req.params;
  const { password, token } = req.body;
  if (!token || !password) throw new Error("Token and password are required");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token is invalid or expired");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Password reset successfully!" : "Password reset failed!",
  });
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetToken,
};
