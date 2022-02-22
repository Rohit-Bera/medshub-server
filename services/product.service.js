const Product = require("../models/productModel");
const fs = require("fs");
const HttpError = require("../middlewares/HttpError");
// const { request, response } = require("express");
// const req = request;
// const res = response;

const postProductApi = async (body) => {
  const {
    productName,
    productPrice,
    availableStatus,
    productImage,
    productBrand,
    productCategory,
    productDescription,
  } = body;

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
      productBrand,
      productCategory,
      productDescription,
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
    const exist = await Product.findByIdAndDelete({ _id });
    console.log("exist: ", exist);

    if (!exist) {
      const error = new HttpError(404, "product not found");

      return { error };
    }

    const { productImage } = exist;

    const path = [];
    const location = [];

    for (var i = 0; i < productImage.length; i++) {
      path.push(productImage[i].slice(36, 66));
      location.push(`./upload/productimages/${path[i]}`);
      fs.unlinkSync(location[i]);
    }

    console.log("path : ", path);
    console.log("location : ", location);

    return { success: "product deleted successfully" };
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "soemthing went wrong");

    return { error: err };
  }
};

const getAllProductApi = async () => {
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

const searchProductApi = async (name) => {
  console.log("productName: ", name);

  const productName = new RegExp(name, "i");

  try {
    const searchpro = await Product.find({ productName });
    console.log("searchpro: ", searchpro);

    if (searchpro == [] || searchpro === null) {
      const error = new HttpError(404, "product not found");

      return { error };
    }

    const found = { success: "product found", searchpro };

    return { found };
  } catch (error) {
    console.log("error: ", error);
  }
};

const searchProductbyBrand = async (brand) => {
  console.log("productbrand: ", brand);

  const productBrand = new RegExp(brand, "i");

  try {
    const searchpro = await Product.find({ productBrand });
    console.log("searchpro: ", searchpro);

    if (searchpro == [] || searchpro === null) {
      const error = new HttpError(404, "product not found");

      return { error };
    }

    const found = { success: "product found", searchpro };

    return { found };
  } catch (error) {
    console.log("error: ", error);
  }
};

const searchProductbyCategory = async (category) => {
  console.log("productcategory: ", category);

  const productCategory = new RegExp(category, "i");

  try {
    const searchpro = await Product.find({ productCategory });
    console.log("searchpro: ", searchpro);

    if (searchpro == [] || searchpro === null) {
      const error = new HttpError(404, "product not found");

      return { error };
    }

    const found = { success: "product found", searchpro };

    return { found };
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = {
  getproductApi,
  postProductApi,
  updateProductApi,
  deleteProductApi,
  getAllProductApi,
  searchProductApi,
  searchProductbyBrand,
  searchProductbyCategory,
};
