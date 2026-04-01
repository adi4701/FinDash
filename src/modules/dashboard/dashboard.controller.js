const asyncHandler = require("../../common/utils/asyncHandler");
const dashboardService = require("./dashboard.service");

const summary = asyncHandler(async (req, res) => {
  const data = await dashboardService.getSummary(req.query);
  res.status(200).json({ success: true, data });
});

const categoryTotals = asyncHandler(async (req, res) => {
  const data = await dashboardService.getCategoryTotals(req.query);
  res.status(200).json({ success: true, data });
});

const recentActivity = asyncHandler(async (_req, res) => {
  const data = await dashboardService.getRecentActivity();
  res.status(200).json({ success: true, data });
});

const monthlyTrends = asyncHandler(async (req, res) => {
  const data = await dashboardService.getMonthlyTrends(req.query);
  res.status(200).json({ success: true, data });
});

module.exports = {
  summary,
  categoryTotals,
  recentActivity,
  monthlyTrends,
};
