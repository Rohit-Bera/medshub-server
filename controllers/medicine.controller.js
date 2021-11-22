const Product = require("../models/productModel");
const fs = require("fs");

const addProductinDB = async (request, response) => {
  const { productName, productPrice, productImage, availableStatus } =
    request.body;

  console.log("availableStatus: ", availableStatus);
  console.log("productImage: ", productImage);
  console.log("productPrice: ", productPrice);
  console.log("productName: ", productName);
};
