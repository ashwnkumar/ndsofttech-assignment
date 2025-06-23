const express = require("express");
const {
  login,
  register,
  googleLogin,
} = require("../controllers/authController");
const { authLimiter } = require("../middlewares/rateLimiter");

const authRouter = express.Router();

authRouter.post("/login", authLimiter, login);
authRouter.post("/register", authLimiter, register);
authRouter.post("/google", authLimiter, googleLogin);

module.exports = authRouter;
