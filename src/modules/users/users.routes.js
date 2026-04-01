const express = require("express");
const authenticate = require("../../common/middleware/authenticate");
const { authorize, requireActive } = require("../../common/middleware/authorize");
const validate = require("../../common/middleware/validate");
const usersController = require("./users.controller");
const { createUserSchema, updateUserSchema, userIdParamSchema } = require("./users.validation");

const router = express.Router();

router.use(authenticate, requireActive, authorize("admin"));

router.post("/", validate(createUserSchema), usersController.createUser);
router.get("/", usersController.listUsers);
router.get("/:id", validate(userIdParamSchema), usersController.getUser);
router.patch("/:id", validate(updateUserSchema), usersController.updateUser);

module.exports = router;
