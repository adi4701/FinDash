const { z } = require("../../common/middleware/validate");

const summaryQuerySchema = z.object({
  body: z.object({}).optional().default({}),
  params: z.object({}).optional().default({}),
  query: z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  }),
});

module.exports = {
  summaryQuerySchema,
};
