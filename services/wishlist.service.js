const Wishlist = require("../models/wishlistModel");
const fs = require("fs");
const HttpError = require("../middlewares/HttpError");

const postWishlistProductApi = async (data) => {
  const { productId, _id } = data;
  try {
    const exist = await Wishlist.findOne({
      product: productId,
      owner: { _id },
    });
    console.log("exist: ", exist);
    if (exist) {
      const error = new HttpError(400, "item found in wishlist");
      return { error };
    }
    const liked = new Wishlist({ product: productId, owner: { _id } });
    console.log("success: ", liked);
    await liked.save();
    return { liked };
  } catch (error) {
    console.log("error: ", error);
    const err = new HttpError(500, "something went wrong");
    return { error };
  }
};

const getWishlistApi = async (data) => {
  const { _id } = data;
  console.log("_id: ", _id);
  try {
    const list = await Wishlist.find({ owner: _id })
      .populate("owner")
      .populate("medicine")
      .populate("product");

    // console.log("list: ", list);

    if (!list) {
      const error = new HttpError(404, "products not found in wishlist");
      return { error };
    }

    return { list };
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "Internal server error");
    return { error: err };
  }
};

const deleteWishlistApi = async (_id) => {
  // console.log("_id: ", _id);
  try {
    const exist = await Wishlist.findByIdAndDelete({ _id });

    if (!exist) {
      const error = new HttpError(404, "item not found");
      return { error };
    }

    return { exist };
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "Internal server error");

    return { error: err };
  }
};

// medicines
const postWishlistMedicineApi = async (data) => {
  const { medicineId, _id } = data;
  try {
    const exist = await Wishlist.findOne({
      medicine: medicineId,
      owner: { _id },
    });
    if (exist) {
      const error = new HttpError(400, "item found in wishlist");
      return { error };
    }
    const liked = new Wishlist({ medicine: medicineId, owner: { _id } });
    console.log("success: ", liked);
    await liked.save();
    return { liked };
  } catch (error) {
    console.log("error: ", error);
    const err = new HttpError(500, "something went wrong");
    return { error };
  }
};

module.exports = {
  postWishlistProductApi,
  getWishlistApi,
  deleteWishlistApi,
  postWishlistMedicineApi,
};
