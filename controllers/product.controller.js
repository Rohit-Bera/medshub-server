const Product = require("../models/productModel");
const fs = require("fs");

// add api of product
const addProduct = async (req, res) => {
  const { productName, productPrice, availableStatus } = req.body;

  try {
    const exist = await Product.findOne({ productName });
    if (exist) {
      return res.json({ status: "500", error: "product already exist" });
    }
    const reqfiles = [];
    const url = req.protocol + "://" + req.get("host"); // for local use
    // const url = "https://medshub-backend.herokuapp.com";
    if (req.files === []) {
      return res.json({ status: "500", error: "no file chosen" });
    }
    for (var i = 0; i < req.files.length; i++) {
      reqfiles.push(url + "/productImages/" + req.files[i].filename);
    }
    console.log("reqfiles: ", reqfiles);
    const productImage = reqfiles;
    const proDetails = {
      productName,
      productPrice,
      productImage,
      availableStatus,
    };
    console.log("proDetails: ", proDetails);
    const newProduct = new Product(proDetails);
    await newProduct.save();

    res.json({ status: "200", newProduct });
  } catch (error) {
    console.log("error: ", error);

    res.json({ status: "500", err: "somethign went wrong" });
  }
};

const updateProduct = async (request, response) => {};

const getProduct = async (request, response) => {
  Product.find((err, products) => {
    if (err) {
      return response.json({ status: "404", error: "product not found" });
    }

    response.json({ status: "200", products });
  });
};

const getAllProduct = async (request, response) => {};

const searchProduct = async (request, response) => {};

module.exports = {
  addProduct,
  getProduct,
};
