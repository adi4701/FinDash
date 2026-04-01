const express = require("express");
const authenticate = require("../../common/middleware/authenticate");
const { authorize, requireActive } = require("../../common/middleware/authorize");
const validate = require("../../common/middleware/validate");
const recordsController = require("./records.controller");
const {
  createRecordSchema,
  updateRecordSchema,
  recordIdParamSchema,
  listRecordsSchema,
} = require("./records.validation");

const router = express.Router();

router.use(authenticate, requireActive);

router.get("/", authorize("analyst", "admin"), validate(listRecordsSchema), recordsController.listRecords);
router.get("/:id", authorize("analyst", "admin"), validate(recordIdParamSchema), recordsController.getRecord);
router.post("/", authorize("admin"), validate(createRecordSchema), recordsController.createRecord);
router.patch("/:id", authorize("admin"), validate(updateRecordSchema), recordsController.updateRecord);
router.delete("/:id", authorize("admin"), validate(recordIdParamSchema), recordsController.deleteRecord);

module.exports = router;
