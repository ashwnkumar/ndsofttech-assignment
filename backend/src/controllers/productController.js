const sendResponse = require("../utils/sendresponse");
const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { name, price, quantity, category } = req.body;

    if (!name || !price || !quantity || !category) {
      return sendResponse(res, 400, "Please enter all required fields");
    }

    const product = await Product.create({ name, price, quantity, category });

    return sendResponse(res, 201, "Product added successfully");
  } catch (error) {
    console.log("Error adding product:", error);
    return sendResponse(res, 500, "Error adding product");
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return sendResponse(res, 200, "Products fetched successfully", {
      products,
    });
  } catch (error) {
    console.log("Error getting products:", error);
    return sendResponse(res, 500, "Error getting products");
  }
};

module.exports = {
  addProduct,
  getProducts,
};
