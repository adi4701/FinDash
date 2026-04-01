const { z } = require("../../common/middleware/validate");

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({}),
});

module.exports = {
  loginSchema,
};
