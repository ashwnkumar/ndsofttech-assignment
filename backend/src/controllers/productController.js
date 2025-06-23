const sendResponse = require("../utils/sendresponse");

const addProduct = async (req, res) => {
  try {
    const {name, price, quantity, category} = req.body
  } catch (error) {
    console.log("Error adding product:", error);
    return sendResponse(res, 500, "Error adding product");
  }
};

const getProducts = (async = (req, res) => {});

module.exports = {
  addProduct,
  getProducts,
};
