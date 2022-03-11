const { request, response } = require("express");
// const { request } = require("http");
const HttpError = require("../middlewares/HttpError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// PlaceOrderServices


const placeOrderServices = async (data) => {
  // console.log('PlaceOrder: ', PlaceOrder);
  const { productId, medicineId, _id,username,email,address } = data;
  
  // console.log('data: ', data);
  try {
    
    const order = new Order({
      product: productId,
      medicine: medicineId,
      owner: { _id },
    });
    console.log("order: ", order);
    await order.save();
    return { order };
  } catch (err) {
    const error = new HttpError(404, "Sorry we can't PlaceOrder");
    console.log("error: ", error);
    return { error };
  }
};
// myOrderServices
const myOrderServices = async (myOrder) => {
  const { _id } = myOrder;

  try {
    const myOrder = await Order.find({ owner: _id })
      .populate("product")
      .populate("medicine");
    console.log("myOrder: ", myOrder);
    return { myOrder };
  } catch (err) {
    const error = new HttpError(404, "Sorry we can't get Your Orders");
    console.log("error: ", error);
    return { error };
  }
};
// cancleOrderServices
const cancleOrderServices = async (_id) => {
  try {
    const cancleOrder = await Order.findByIdAndDelete({ _id });
    if (!cancleOrder) {
      const error = new HttpError(404, "order not Found!");
      console.log("error: ", error);
      return { error };
    }

    // console.log('cancleOrder: ', cancleOrder);

    return { cancleOrder };
  } catch (err) {
    const error = new HttpError(404, "Sorry we can't delete Your Orders");
    console.log("error: ", error);
    return { error };
  }
};

//allOrderServices
const allOrderservices = async () => {
  try {
    const allOrder = await Order.find().populate("owner").populate("product").populate("medicine");

    if (allOrder) {
      return { allOrder };
    } else {
      const error = new HttpError(404, "Sorry No Orders yet");
      console.log("error: ", error);
      return { error };
    }
  } catch (err) {
    const error = new HttpError(
      404,
      "something went wrong in allOrder Services!"
    );
    console.log("error: ", error);
    return { error };
  }
};
//update order services
const updateOrderServices = async (data1) => {
  const { _id, data } = data1;

  try {
    const updateOrder = await Order.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );
    console.log("updateOrder: ", updateOrder);
    if (!updateOrder) {
      const error = new HttpError(404, "Sorry can't update Order !");
      console.log("error: ", error);
      return { error };
    }
    return { updateOrder };
  } catch (err) {
    const error = new HttpError(
      500,
      "something went Wrong in update order  services"
    );
    console.log("error: ", error);
    return { error };
  }
};
module.exports = {
  placeOrderServices,
  myOrderServices,
  cancleOrderServices,
  allOrderservices,
  updateOrderServices,
};
