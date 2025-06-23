const envConfig = require("../configs/envConfig");
const sendResponse = require("../utils/sendresponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(
      res,
      401,
      "Cannot perform this action. Please login first"
    );
  }

 const token = authHeader.split(" ")[1];



  try {
    const decoded = jwt.verify(token, envConfig.jwtSecret);

    const user = await User.findById(decoded.id);
    if (!user) {
      return sendResponse(res, 401, "User not found. Please login again.");
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error("Error authenticating user:", error.message);
    return sendResponse(
      res,
      401,
      "Invalid or expired token. Please login again."
    );
  }
};

module.exports = authMiddleware;
