require("dotenv").config();
const express = require("express");
const cors = require("cors");
const envConfig = require("./src/configs/envConfig");
const connectDb = require("./src/configs/db");
const productRouter = require("./src/routes/productRouter");
const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");
const admin = require("firebase-admin");
const serviceAccount = require("./src/configs/serviceAccount.json");
const { generalLimiter } = require("./src/middlewares/rateLimiter");

const app = express();
connectDb();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
// app.use(generalLimiter);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

const PORT = envConfig.port || 4000;
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
