const express = require("express");
const validate = require("../../common/middleware/validate");
const authenticate = require("../../common/middleware/authenticate");
const { requireActive } = require("../../common/middleware/authorize");
const authController = require("./auth.controller");
const { loginSchema } = require("./auth.validation");

const router = express.Router();

router.post("/login", validate(loginSchema), authController.login);
router.get("/me", authenticate, requireActive, authController.me);

module.exports = router;
