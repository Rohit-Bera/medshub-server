const { request } = require("http");
const cartServices = require("../services/cart.service");

//placeorder controller
const postCartProdController = async (request, response, next) => {
  const { productId } = request.query;
  // console.log('productId: ', productId);
  const user = request.user;
  //   console.log("user: ", user);
  const _id = user._id;
  //   console.log('_id: ', _id);
  const data = { productId, _id };
  const data1 = await cartServices.placeProdCartServices(data);
  const { cart, error } = data1;
  console.log("error: ", error);
  if (error) {
    response.json({ error });
    return next(error);
  }
  response.json({ status: "200", cart });
};

const postCartMedController = async (request, response, next) => {
  const { medicineId } = request.query;

  const user = request.user;

  const _id = user._id;

  const data = { medicineId, _id };
  const data1 = await cartServices.placeMedCartServices(data);
  const { cart, error } = data1;
  console.log("error: ", error);
  if (error) {
    response.json({ error });
    return next(error);
  }
  response.json({ status: "200", cart });
};

//myorders for user
const myCartController = async (request, response, next) => {
  const user = request.user;
  const _id = user._id;
  const data = await cartServices.myCartServices(_id);
  const { myCart, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", myCart });
};

//cancle orders
const cancleCartController = async (request, response, next) => {
  const _id = request.params.id;
  console.log("_id: ", _id);
  const data = await cartServices.cancleCartServices(_id);
  const { cancleCart, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", cancleCart });
};

module.exports = {
  postCartProdController,
  postCartMedController,
  myCartController,
  cancleCartController,
};
