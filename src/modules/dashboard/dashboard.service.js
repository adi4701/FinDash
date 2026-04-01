const FinancialRecord = require("../records/record.model");

function buildDateMatch(query) {
  if (!query.startDate && !query.endDate) {
    return {};
  }

  const date = {};
  if (query.startDate) {
    date.$gte = query.startDate;
  }
  if (query.endDate) {
    date.$lte = query.endDate;
  }

  return { date };
}

async function getSummary(query) {
  const match = buildDateMatch(query);

  const totals = await FinancialRecord.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const totalIncome = totals.find((item) => item._id === "income")?.total || 0;
  const totalExpenses = totals.find((item) => item._id === "expense")?.total || 0;

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
  };
}

async function getCategoryTotals(query) {
  const match = buildDateMatch(query);

  return FinancialRecord.aggregate([
    { $match: match },
    {
      $group: {
        _id: { type: "$type", category: "$category" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.type": 1, total: -1 } },
  ]);
}

async function getRecentActivity() {
  return FinancialRecord.find({}).sort({ date: -1, createdAt: -1 }).limit(10);
}

async function getMonthlyTrends(query) {
  const match = buildDateMatch(query);

  return FinancialRecord.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);
}

module.exports = {
  getSummary,
  getCategoryTotals,
  getRecentActivity,
  getMonthlyTrends,
};
