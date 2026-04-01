const asyncHandler = require("../../common/utils/asyncHandler");
const recordsService = require("./records.service");

const createRecord = asyncHandler(async (req, res) => {
  const record = await recordsService.createRecord(req.body, req.user._id);
  res.status(201).json({ success: true, data: record });
});

const listRecords = asyncHandler(async (req, res) => {
  const records = await recordsService.listRecords(req.query);
  res.status(200).json({ success: true, data: records.items, meta: records.meta });
});

const getRecord = asyncHandler(async (req, res) => {
  const record = await recordsService.getRecordById(req.params.id);
  res.status(200).json({ success: true, data: record });
});

const updateRecord = asyncHandler(async (req, res) => {
  const record = await recordsService.updateRecord(req.params.id, req.body);
  res.status(200).json({ success: true, data: record });
});

const deleteRecord = asyncHandler(async (req, res) => {
  const result = await recordsService.deleteRecord(req.params.id);
  res.status(200).json({ success: true, data: result });
});

module.exports = {
  createRecord,
  listRecords,
  getRecord,
  updateRecord,
  deleteRecord,
};
