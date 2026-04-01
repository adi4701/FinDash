const bcrypt = require("bcryptjs");
const ApiError = require("../../common/utils/apiError");
const env = require("../../config/env");
const User = require("./user.model");

async function createUser(payload) {
  const exists = await User.findOne({ email: payload.email.toLowerCase() });

  if (exists) {
    throw new ApiError(409, "User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(payload.password, env.BCRYPT_SALT_ROUNDS);

  const user = await User.create({
    name: payload.name,
    email: payload.email.toLowerCase(),
    passwordHash,
    role: payload.role,
    status: payload.status,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  };
}

async function listUsers() {
  return User.find({}, { passwordHash: 0 }).sort({ createdAt: -1 });
}

async function getUserById(id) {
  const user = await User.findById(id, { passwordHash: 0 });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
}

async function updateUser(id, payload, actorId) {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (String(user._id) === String(actorId) && payload.status === "inactive") {
    throw new ApiError(400, "You cannot deactivate your own account");
  }

  Object.assign(user, payload);
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    updatedAt: user.updatedAt,
  };
}

module.exports = {
  createUser,
  listUsers,
  getUserById,
  updateUser,
};
