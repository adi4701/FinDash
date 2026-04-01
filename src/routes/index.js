const express = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const usersRoutes = require("../modules/users/users.routes");
const recordsRoutes = require("../modules/records/records.routes");
const dashboardRoutes = require("../modules/dashboard/dashboard.routes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Service is healthy" });
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/records", recordsRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
