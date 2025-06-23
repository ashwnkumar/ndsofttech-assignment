const express = require("express");
const { login, register, googleLogin } = require("../controllers/authController");
const { authLimiter } = require("../middlewares/rateLimiter");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/google", googleLogin);

module.exports = authRouter;
