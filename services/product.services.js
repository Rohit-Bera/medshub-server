const Product = require("../models/productModel");
const fs = require("fs");
const HttpError = require("../middlewares/HttpError");

const getproductApi = async () => {
  try {
    const products = await Product.find();

    if (!products) {
      const error = new HttpError(404, "Product not found!");

      return { error };
    }

    return { products };
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = {
  getproductApi,
};
