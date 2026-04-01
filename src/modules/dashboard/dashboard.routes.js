const express = require("express");
const authenticate = require("../../common/middleware/authenticate");
const { authorize, requireActive } = require("../../common/middleware/authorize");
const validate = require("../../common/middleware/validate");
const dashboardController = require("./dashboard.controller");
const { summaryQuerySchema } = require("./dashboard.validation");

const router = express.Router();

router.use(authenticate, requireActive, authorize("viewer", "analyst", "admin"));

router.get("/summary", validate(summaryQuerySchema), dashboardController.summary);
router.get("/category-totals", validate(summaryQuerySchema), dashboardController.categoryTotals);
router.get("/recent-activity", dashboardController.recentActivity);
router.get("/monthly-trends", validate(summaryQuerySchema), dashboardController.monthlyTrends);

module.exports = router;
