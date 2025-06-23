const envConfig = require("../configs/envConfig");
const sendResponse = require("../utils/sendresponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const admin = require("firebase-admin");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, envConfig.jwtSecret, {
    expiresIn: "1d",
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendResponse(res, 400, "Please enter all required fields");
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return sendResponse(res, 400, "User already exists");
    }

    const newUser = await User.create({ name, email, password });

    const user = await User.findById(newUser._id);

    const token = generateToken(user);

    return sendResponse(res, 201, "Registration Successful", {
      token,
      user,
    });
  } catch (error) {
    console.log("Error registering user:", error);
    return sendResponse(res, 500, "Error registering user");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, "Please enter all required fields");
    }

    const existing = await User.findOne({ email }).select("+password");
    if (!existing) {
      return sendResponse(
        res,
        400,
        "This user does not exist. Please register first"
      );
    }

    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) {
      return sendResponse(res, 400, "Invalid credentials");
    }

    const user = await User.findById(existing._id);
    const token = generateToken(user);

    return sendResponse(res, 200, "Login Successful", { token, user });
  } catch (error) {
    console.log("Error logging in user:", error);
    return sendResponse(res, 500, "Error logging in user");
  }
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return sendResponse(res, 400, "Token Missing");

    const decoded = await admin.auth().verifyIdToken(token);

    const { uid, email, name } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, googleId: uid, name });
    }

    const jwtToken = generateToken(user);
   

    return sendResponse(res, 200, "Login Successful", {
      token: jwtToken,
      user,
    });
  } catch (error) {
    console.log("Error logging in user using google:", error);
    return sendResponse(res, 500, "Error logging in user");
  }
};

module.exports = {
  register,
  login,
  googleLogin,
};
