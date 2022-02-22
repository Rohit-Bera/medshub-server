const { request, response } = require("express");
// const { request } = require("http");
const HttpError = require("../middlewares/HttpError");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// PlaceOrderServices
const placeCartServices = async (data) => {
  // console.log('PlaceOrder: ', PlaceOrder);
  const { productId, medicineId, _id } = data;
  // console.log('data: ', data);
  try {
    const exist = await Cart.findOne({
      product: productId,
      medicine: medicineId,
      owner: { _id },
    });

    if (exist) {
      const error = new HttpError(400, "item found in cart");
      return { error };
    }

    const cart = new Cart({
      product: productId,
      medicine: medicineId,
      owner: { _id },
    });
    console.log("cart: ", cart);
    await cart.save();
    return { cart };
  } catch (err) {
    const error = new HttpError(404, "Sorry we can't PlaceOrder");
    console.log("error: ", error);
    return { error };
  }
};
// myOrderServices
const myCartServices = async (myCart) => {
  const { _id } = myCart;

  try {
    const myCart = await Cart.find({ owner: _id })
      .populate("product")
      .populate("medicine");
    console.log("myCart: ", myCart);
    return { myCart };
  } catch (err) {
    const error = new HttpError(404, "Sorry we can't get Your Orders");
    console.log("error: ", error);
    return { error };
  }
};
// cancleCartServices
const cancleCartServices = async (_id) => {
  try {
    const cancleCart = await Cart.findByIdAndDelete({ _id });
    if (!cancleCart) {
      const error = new HttpError(404, "order not Found!");
      console.log("error: ", error);
      return { error };
    }

    // console.log('cancleCart: ', cancleCart);

    return { cancleCart };
  } catch (err) {
    const error = new HttpError(404, "Sorry we can't delete Your Orders");
    console.log("error: ", error);
    return { error };
  }
};

module.exports = {
  placeCartServices,
  myCartServices,
  cancleCartServices,
};
