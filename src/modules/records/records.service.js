const ApiError = require("../../common/utils/apiError");
const FinancialRecord = require("./record.model");

async function createRecord(payload, userId) {
  const record = await FinancialRecord.create({ ...payload, createdBy: userId });
  return record;
}

async function listRecords(query) {
  const filter = {};

  if (query.type) {
    filter.type = query.type;
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) {
      filter.date.$gte = query.startDate;
    }
    if (query.endDate) {
      filter.date.$lte = query.endDate;
    }
  }

  const sortDirection = query.sortOrder === "asc" ? 1 : -1;
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    FinancialRecord.find(filter)
      .sort({ [query.sortBy]: sortDirection })
      .skip(skip)
      .limit(query.limit)
      .populate("createdBy", "name email role"),
    FinancialRecord.countDocuments(filter),
  ]);

  return {
    items,
    meta: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

async function getRecordById(id) {
  const record = await FinancialRecord.findById(id).populate("createdBy", "name email role");

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return record;
}

async function updateRecord(id, payload) {
  const record = await FinancialRecord.findById(id);

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  Object.assign(record, payload);
  await record.save();

  return record;
}

async function deleteRecord(id) {
  const record = await FinancialRecord.findById(id);

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  await record.deleteOne();

  return { id };
}

module.exports = {
  createRecord,
  listRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
