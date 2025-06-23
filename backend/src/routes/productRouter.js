const express = require("express");
const { addProduct, getProducts } = require("../controllers/productController");

const productRouter = express.Router();

productRouter.post("/add-product", addProduct);
productRouter.get("/get-products", getProducts);

module.exports = productRouter;
