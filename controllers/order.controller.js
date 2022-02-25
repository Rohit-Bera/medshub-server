const { request } = require("http");
const orderServices = require("../services/order.service");
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
//placeorder controller
const placeOrderController = async (request, response, next) => {
  const { productId, medicineId } = request.query;
  // console.log('productId: ', productId);
  const user = request.user;
    // console.log("user: ", user);
  const _id = user._id;
  const email = user.email;
  const username = user.name;
  //   console.log('_id: ', _id);
  const data = { productId, medicineId, _id,email,username };
  const data1 = await orderServices.placeOrderServices(data);
  const { order, error } = data1;
  if (error) {
    return next(error);
  }
  if(order){
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN,
        pass: process.env.PASS,
      },
    });

    var mailOptions = {
      from: process.env.ADMIN,
      to: email,
      subject: "Auto email Message",
      text: `Hello ${username} , you have successfully placed your order . wait for your delievery! . soon your order would be dispatched.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  response.json({ status: "200", order });
};
//myorders for user
const myOrderController = async (request, response, next) => {
  const user = request.user;
  const _id = user._id;
  const data = await orderServices.myOrderServices(_id);
  const { myOrder, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", myOrder });
};

//cancle orders
const cancleOrderController = async (request, response, next) => {
  const _id = request.params.id;
  console.log("_id: ", _id);
  const data = await orderServices.cancleOrderServices(_id);
  const { cancleOrder, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", cancleOrder });
};

// allOrdersController  For admin
const allOrderController = async (request, response, next) => {
  const data = await orderServices.allOrderservices();
  const { allOrder, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", allOrder });
};
//updateController
const updateOrderController = async (request, response, next) => {
  const _id = request.params.id;
  // console.log('_id: ', _id);
  const data = request.body;
  // console.log('data: ', data);
  const user = request.user;
  // console.log('user: ', user);
  const data1 = { _id, data };
  // console.log('data: ', data);
  const update = await orderServices.updateOrderServices(data1);
  const { updateOrder, error } = update;
  // console.log('updateOrder: ', updateOrder);
  if (error) {
    console.log("error: ", error);
    return next(error);
  }
  response.json({ status: "200", updateOrder });
};

module.exports = {
  placeOrderController,
  myOrderController,
  cancleOrderController,
  allOrderController,
  updateOrderController,
};
