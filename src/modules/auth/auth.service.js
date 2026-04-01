const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../../common/utils/apiError");
const User = require("../users/user.model");
const env = require("../../config/env");

function signToken(user) {
  return jwt.sign(
    {
      role: user.role,
      status: user.status,
    },
    env.JWT_SECRET,
    {
      subject: String(user._id),
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );
}

async function login(email, password) {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (user.status !== "active") {
    throw new ApiError(403, "Inactive users cannot login");
  }

  const token = signToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
}

module.exports = {
  login,
};
