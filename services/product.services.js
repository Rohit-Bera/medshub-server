const Product = require("../models/productModel");
const fs = require("fs");
const HttpError = require("../middlewares/HttpError");
// const { request, response } = require("express");
// const req = request;
// const res = response;

const postProductApi = async (body) => {
  const { productName, productPrice, availableStatus, productImage } = body;

  try {
    const exist = await Product.findOne({ productName });
    if (exist) {
      const error = new HttpError(404, "Data found in database");

      return { error };
    }

    const proDetails = {
      productName,
      productPrice,
      productImage,
      availableStatus,
    };
    console.log("proDetails: ", proDetails);
    const newProduct = new Product(proDetails);
    await newProduct.save();

    return { newProduct };
  } catch (error) {
    console.log("post service error: ", error);

    const err = new HttpError(404, "something went wrong");

    return { error: err };
  }
};

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

const updateProductApi = async (data) => {
  const { _id, body } = data;

  try {
    const product = await Product.findByIdAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );

    if (!_id || !body) {
      const error = new HttpError(404, "product not found");

      return { error };
    }

    return { product };
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(404, "product not found");

    return { error: err };
  }
};

const deleteProductApi = async (_id) => {
  console.log("id : ", _id);

  try {
    const exist = await Product.findById({ _id });

    if (!exist) {
      const error = new HttpError(404, "product not found");

      return { error };
    }

    const deleted = await Product.findByIdAndDelete({ _id });

    return { deleted };
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "soemthing went wrong");

    return { error: err };
  }
};

module.exports = {
  getproductApi,
  postProductApi,
  updateProductApi,
  deleteProductApi,
};
