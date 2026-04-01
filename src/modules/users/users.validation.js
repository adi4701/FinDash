const { z } = require("../../common/middleware/validate");

const roleEnum = z.enum(["viewer", "analyst", "admin"]);
const statusEnum = z.enum(["active", "inactive"]);

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: roleEnum.default("viewer"),
    status: statusEnum.default("active"),
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({}),
});

const updateUserSchema = z.object({
  body: z
    .object({
      name: z.string().min(2).optional(),
      role: roleEnum.optional(),
      status: statusEnum.optional(),
    })
    .refine((data) => Object.keys(data).length > 0, "At least one field is required"),
  query: z.object({}).optional().default({}),
  params: z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user id"),
  }),
});

const userIdParamSchema = z.object({
  body: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
  params: z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user id"),
  }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
};
