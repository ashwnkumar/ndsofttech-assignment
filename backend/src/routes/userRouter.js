const express = require("express");
const { getUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getUser);

module.exports = userRouter;