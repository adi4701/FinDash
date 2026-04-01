const ApiError = require("../utils/apiError");

function requireActive(req, _res, next) {
  if (!req.user || req.user.status !== "active") {
    return next(new ApiError(403, "Inactive users are not allowed"));
  }

  return next();
}

function authorize(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Insufficient permissions"));
    }

    return next();
  };
}

module.exports = {
  requireActive,
  authorize,
};
