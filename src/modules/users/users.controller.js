const asyncHandler = require("../../common/utils/asyncHandler");
const usersService = require("./users.service");

const createUser = asyncHandler(async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
});

const listUsers = asyncHandler(async (_req, res) => {
  const users = await usersService.listUsers();
  res.status(200).json({ success: true, data: users });
});

const getUser = asyncHandler(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  res.status(200).json({ success: true, data: user });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body, req.user._id);
  res.status(200).json({ success: true, data: user });
});

module.exports = {
  createUser,
  listUsers,
  getUser,
  updateUser,
};
