const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt.middleware.js");
const jwt = require("jsonwebtoken");
const sentMail = require("../ultils/sentMail.js");
const makeToken = require("uniqid");
const Product = require("../models/product.model");

// const register = asyncHandler(async (req, res) => {
//   const { email, password, firstName, lastName, mobile } = req.body;

//   if (!email || !password || !firstName || !lastName || !mobile) {
//     res.status(400).json({
//       success: false,
//       message: "Please fill all the fields!",
//     });
//   }

//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Error("User already exists!");
//   } else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       message: newUser ? "User created successfully!" : "User creation failed!",
//     });
//   }
// });

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
  }

  const token = makeToken();

  res.cookie(
    "dataregister",
    { ...req.body, token },
    {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    }
  );

  const html = `
    <h1>
      Verify your email address
    </h1>
    <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click this link to verify your email</a> <p>
      This link will expire in 15 minutes
    </p>
  `;

  const data = {
    email,
    subject: "Verify your email address",
    html,
  };

  const rs = await sentMail(data);
  return res.status(200).json({
    success: true,
    rs,
    message: "Please check your email to verify your account!",
  });
});

const finalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;
  if (!cookie || cookie?.dataregister?.token !== token) {
    res.clearCookie("dataregister");
    res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
    res.end();
  }
  if (cookie?.dataregister?.token === token) {
    const user = await User.create({
      email: cookie?.dataregister?.email,
      password: cookie?.dataregister?.password,
      firstName: cookie?.dataregister?.firstName,
      lastName: cookie?.dataregister?.lastName,
      mobile: cookie?.dataregister?.mobile,
    });
    if (user) {
      res.clearCookie("dataregister");
      res.redirect(`${process.env.CLIENT_URL}/finalregister/success`);
      res.end();
    } else {
      res.clearCookie("dataregister");
      res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
      res.end();
    }
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
    const { password, role, refreshToken, ...userData } = response.toObject();
    // Tạo accessToken và refreshToken
    const accessToken = generateAccessToken(response._id, role);
    const newRefreshToken = generateRefreshToken(response._id);

    // Lưu refreshToken vào database
    await User.findByIdAndUpdate(
      response._id,
      { newRefreshToken },
      { new: true }
    );
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
  const user = await User.findById(_id).select("-refreshToken -password");
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
  const { email } = req.body;
  if (!email) throw new Error("Email is required");
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email is not found");
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `
    <h1>Reset your password</h1>
    <p>Click this <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>link</a> to reset your password</p>
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
    message: "Please check your email to reset your password!",
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

const getUsers = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  const excludedfields = ["page", "sort", "limit", "fields"];
  excludedfields.forEach((el) => delete queries[el]);

  let querystring = JSON.stringify(queries);
  querystring = querystring.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatedqueries = JSON.parse(querystring);

  if (queries?.firstname)
    formatedqueries.firstname = { $regex: queries.title, $options: "i" };
  let querycommand = User.find(formatedqueries);

  if (req.query.sort) {
    const sortby = req.query.sort.split(",").join(" ");
    querycommand = querycommand.sort(sortby);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    querycommand = querycommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.limit_products;
  const skip = (page - 1) * limit;
  querycommand = querycommand.skip(skip).limit(limit);

  querycommand.exec(async (err, users) => {
    if (err) throw new error(err);
    const counts = await User.find(formatedqueries).countDocuments();
    return res.status(200).json({
      success: users ? true : false,
      counts,
      users: users ? users : "Users not found",
    });
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("User id is required");
  const user = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "User deleted successfully!" : "User deletion failed!",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("User id and data are required");
  const user = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -refreshToken -role");
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "User updated successfully!" : "User update failed!",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid || Object.keys(req.body).length === 0)
    throw new Error("User id and data are required");
  const user = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -refreshToken -role");
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "User updated successfully!" : "User update failed!",
  });
});

const updateAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("User id and data are required");

  const user = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    {
      new: true,
    }
  ).select("-password -refreshToken -role");
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "User updated successfully!" : "User update failed!",
  });
});

const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;

  if (!_id || !pid || !quantity || !color) {
    throw new Error("User id and data are required");
  }

  const user = await User.findById(_id).select("cart");
  const alreadyProduct = user.cart.find(
    (item) => item.product.toString() === pid
  );
  if (alreadyProduct) {
    if (alreadyProduct.color === color) {
      const response = await User.updateOne(
        {
          cart: { $elemMatch: alreadyProduct },
        },
        {
          $set: { "cart.$.quantity": quantity },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "User update failed!",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        {
          $push: {
            cart: {
              product: pid,
              quantity,
              color,
            },
          },
        },
        {
          new: true,
        }
      ).select("-password -refreshToken -role");

      return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "User update failed!",
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          cart: {
            product: pid,
            quantity,
            color,
          },
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken -role");

    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "User update failed!",
    });
  }
});

module.exports = {
  register,
  finalRegister,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetToken,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateAddress,
  updateCart,
};
