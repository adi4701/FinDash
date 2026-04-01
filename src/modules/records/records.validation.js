const { z } = require("../../common/middleware/validate");

const recordBody = z.object({
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1),
  date: z.coerce.date(),
  notes: z.string().max(500).optional().default(""),
});

const createRecordSchema = z.object({
  body: recordBody,
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({}),
});

const updateRecordSchema = z.object({
  body: recordBody.partial().refine((data) => Object.keys(data).length > 0, "At least one field is required"),
  query: z.object({}).optional().default({}),
  params: z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid record id"),
  }),
});

const recordIdParamSchema = z.object({
  body: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
  params: z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid record id"),
  }),
});

const listRecordsSchema = z.object({
  body: z.object({}).optional().default({}),
  params: z.object({}).optional().default({}),
  query: z.object({
    type: z.enum(["income", "expense"]).optional(),
    category: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    sortBy: z.enum(["date", "amount", "createdAt"]).default("date"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});

module.exports = {
  createRecordSchema,
  updateRecordSchema,
  recordIdParamSchema,
  listRecordsSchema,
};
