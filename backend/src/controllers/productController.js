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

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price, quantity, category } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return sendResponse(res, 404, "Product not found");
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (category) product.category = category;

    await product.save();

    return sendResponse(res, 200, "Product details updated successfully");
  } catch (error) {
    console.log("Error editing product:", error);
    return sendResponse(res, 500, "Error editing product details");
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return sendResponse(res, 404, "Product not found");
    }

    return sendResponse(res, 200, "Product details fetched successfully", {
      product,
    });
  } catch (error) {
    console.log("Error getting product by ID:", error);
    return sendResponse(res, 500, "Error getting product by ID");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return sendResponse(res, 404, "Product not found");
    }
    await product.deleteOne();

    return sendResponse(res, 200, "Product deleted successfully");
  } catch (error) {
    console.log("Error deleting product:", error);
    return sendResponse(res, 500, "Error deleting product");
  }
};

module.exports = {
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
  getProductById,
};
