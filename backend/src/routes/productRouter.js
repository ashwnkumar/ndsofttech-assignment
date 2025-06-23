const express = require("express");
const {
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

const productRouter = express.Router();

productRouter.post("/add", authMiddleware, addProduct);
productRouter.get("/get-all", authMiddleware, getProducts);
productRouter.get("/:id", authMiddleware, getProductById);
productRouter.put("/edit/:id", authMiddleware, editProduct);
productRouter.delete("/delete/:id", authMiddleware, deleteProduct);

module.exports = productRouter;
