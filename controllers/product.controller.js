const Product = require("../models/productModel");
const fs = require("fs");
const service = require("../services/product.service");

// add api of product
const addProduct = async (req, res, next) => {
  const {
    productName,
    productPrice,
    availableStatus,
    productBrand,
    productCategory,
    productDescription,
  } = req.body;
  console.log("req.body: ", req.body);

  const reqfiles = [];
  const url = req.protocol + "://" + req.get("host"); // for local use
  // const url = "https://medshub-backend.herokuapp.com";
  if (req.files === []) {
    const nofile = new HttpError(500, "no file chosen");
    return { nofile };
  }
  for (var i = 0; i < req.files.length; i++) {
    reqfiles.push(url + "/productImages/" + req.files[i].filename);
  }
  console.log("reqfiles: ", reqfiles);
  const productImage = reqfiles;

  const body = {
    productName,
    productPrice,
    availableStatus,
    productImage,
    productBrand,
    productCategory,
    productDescription,
  };

  const send = await service.postProductApi(body);

  const { newProduct, error } = send;

  if (error) {
    return next(error);
  }

  res.json({ status: "200", newProduct });
};

const updateProduct = async (request, response, next) => {
  const _id = request.params.id;
  const body = request.body;
  //   console.log("body: ", body);

  const {
    productName,
    productPrice,
    availableStatus,
    productImage,
    productBrand,
    productCategory,
    productDescription,
  } = request.body;
  //   console.log("productPrice: ", productPrice);
  //   console.log("productName: ", productName);
  //   console.log("availableStatus: ", availableStatus);
  //   console.log("productImage: ", productImage);

  if (productImage === undefined) {
    const reqfiles = [];
    const url = request.protocol + "://" + request.get("host"); // for local use
    // const url = "https://medshub-backend.herokuapp.com";
    if (request.files === []) {
      const nofile = new HttpError(500, "no file chosen");
      response.json(nofile);
      return next(nofile);
    }
    for (var i = 0; i < request.files.length; i++) {
      reqfiles.push(url + "/productImages/" + request.files[i].filename);
    }
    console.log("reqfiles: ", reqfiles);
    const productImage = reqfiles;

    const body = {
      productName,
      productPrice,
      availableStatus,
      productImage,
      productBrand,
      productCategory,
      productDescription,
    };

    const data = { _id, body };

    const send = await service.updateProductApi(data);

    const { error, product } = send;

    if (error) {
      return next(error);
    }

    response.json({ status: "200", product });
  } else {
    const data = { _id, body };

    const send = await service.updateProductApi(data);

    const { error, product } = send;

    if (error) {
      return next(error);
    }

    response.json({ status: "200", product });
  }
};

const getProduct = async (request, response, next) => {
  const send = await service.getproductApi();

  const { products, error } = send;

  if (error) {
    return next(error);
  }

  response.status(200).json(products);
};

const deleteProduct = async (request, response, next) => {
  const _id = request.params.id;

  const send = await service.deleteProductApi(_id);

  const { success, error } = send;

  if (error) {
    response.json(error);
    return next(error);
  }

  response.json({ success, status: "200" });
};

const getAllProduct = async (request, response, next) => {
  const send = await service.getAllProductApi();

  const { products, error } = send;

  if (error) {
    return next(error);
  }

  response.status(200).json(products);
};

const getSearchProduct = async (request, response, next) => {
  const search = request.params.name;

  const send = await service.searchProductApi(search);

  const { found, error } = send;

  if (error) {
    response.json(error);
    console.log("error: ", error);
    return next(error);
  }

  response.json({ status: "200", found });
};

const getSearchProductbyBrand = async (request, response, next) => {
  const search = request.params.brand;

  const send = await service.searchProductbyBrand(search);

  const { found, error } = send;

  if (error) {
    response.json(error);
    console.log("error: ", error);
    return next(error);
  }

  response.json({ status: "200", found });
};

const getSearchProductbyCategory = async (request, response, next) => {
  const search = request.params.category;

  const send = await service.searchProductbyCategory(search);

  const { found, error } = send;

  if (error) {
    response.json(error);
    console.log("error: ", error);
    return next(error);
  }

  response.json({ status: "200", found });
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getSearchProduct,
  getSearchProductbyBrand,
  getSearchProductbyCategory,
};
