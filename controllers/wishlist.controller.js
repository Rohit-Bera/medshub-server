const Wishlist = require("../models/wishlistModel");
const fs = require("fs");
const HttpError = require("../middlewares/HttpError");
const service = require("../services/wishlist.service");

// product
const addWishlistProduct = async (request, response, next) => {
  const { productId } = request.query;
  console.log("productId: ", productId);
  const user = request.user;
  console.log("user: ", user);
  const _id = user._id;
  console.log("_id: ", _id);
  const data = { productId, _id };
  const send = await service.postWishlistProductApi(data);
  const { liked, error } = send;
  if (error) {
    response.json({ error });
    return next(error);
  }
  response.json({ status: "200", liked });
};

const getWishlist = async (request, response, next) => {
  const user = request.user;
  console.log("user: ", user);
  const _id = user._id;
  // console.log("_id: ", _id);

  const send = await service.getWishlistApi(_id);

  const { list, error } = send;
  // console.log("list: ", list);

  if (error) {
    response.json(error);
    return next(error);
  }

  response.json({ status: "200", list });
};

const removeFromWishlist = async (request, response, next) => {
  const _id = request.params.id;
  console.log("_id: ", _id);

  const send = await service.deleteWishlistApi(_id);

  const { exist, error } = send;

  if (error) {
    response.json(error);
    return next(error);
  }

  response.json({
    status: "200",
    sucess: "item removed from wishlist successfully",
    exist,
  });
};

// medicines
const addWishlistMedicine = async (request, response, next) => {
  const { medicineId } = request.query;
  console.log("medicineId: ", medicineId);
  const user = request.user;
  console.log("user: ", user);
  const _id = user._id;
  console.log("_id: ", _id);
  const data = { medicineId, _id };
  const send = await service.postWishlistMedicineApi(data);
  const { liked, error } = send;
  if (error) {
    response.json(error);
    return next(error);
  }
  response.json({ status: "200", liked });
};

module.exports = {
  addWishlistProduct,
  getWishlist,
  removeFromWishlist,
  addWishlistMedicine,
};
