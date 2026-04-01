const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const ApiError = require("../utils/apiError");
const User = require("../../modules/users/user.model");

async function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Missing or invalid authorization header"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.sub).select("-passwordHash");

    if (!user) {
      return next(new ApiError(401, "Invalid token user"));
    }

    req.user = user;
    return next();
  } catch (_error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}

module.exports = authenticate;
