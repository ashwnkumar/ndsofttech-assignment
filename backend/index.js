require("dotenv").config();
const express = require("express");
const cors = require("cors");
const envConfig = require("./src/configs/envConfig");
const connectDb = require("./src/configs/db");
const productRouter = require("./src/routes/productRouter");
const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");

const app = express();
connectDb();

app.use(
  cors({
    origin: "http://192.168.1.33:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

const PORT = envConfig.port || 4000;
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
