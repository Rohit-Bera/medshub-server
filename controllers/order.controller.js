const { request } = require("http");
const orderServices = require("../services/order.service");
const nodemailer = require('nodemailer');
require("dotenv").config();
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Medicine = require("../models/medicineModel");
//placeorder controller
const placeOrderController = async (request, response, next) => {
  const { productId, medicineId } = request.query;
  const user = request.user;
  const _id = user._id;
  const email = user.email;
  const username = user.name;
  const data = { productId, medicineId, _id,email,username };
  const data1 = await orderServices.placeOrderServices(data);
  const { order, error } = data1;
  const {product,medicine} = order
 if(product)
 {
  const prod = await Product.findOne();
  const {productName,productPrice,productBrand,productDescription} = prod
    
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
      subject: "NO reply",
      html:`<p>Hello <b>${username}</b>,</p>
      <p>ThankYou for your order of <b>${productName}</b> and for your prompt online payment. Your order will be shipped within three to five business days.
      We will send you a quick e-mail when it is shipped.</p>
      <p>Your Order Details</p><hr></hr>
      <p><span>--------------------------------------------------</span><br></br>
     <span>Product Name : "${productName}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <span>Product Brand : "${productBrand}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <spanProduct Description : "${productDescription}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <span>Product Price : "${productPrice}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>A
      </p>

     
       <p>We hope you enjoyed shopping with us.</p>
       <br></br><br></br><br></br>
       <p><span>Thanks and Regards,</span><br></br><span>MedsHub24/7</span></p>
       `
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  
 }
 else if(medicine){
  const med = await Medicine.findOne();
  const {medicineName,medicinePrice,medicineDescription} = med
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
    subject: "NO reply",
    html:`<p>Hello ${username},</p>
    <p>ThankYou for your order of "pName" and for your prompt online payment. Your order will be shipped within three to five business days.
     We will send you a quick e-mail when it is shipped.</p>
    <p>Your Order Details</p><hr></hr>
    <p><span>--------------------------------------------------</span><br></br>
    <span>Medicine Name : "${medicineName}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <span>Medicine Description : "${medicineDescription}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <span>Medicine Price : "${medicinePrice}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      </p>
     <p>We hope you enjoyed shopping with us.</p>
     <br></br><br></br><br></br>
       <p><span>Thanks and Regards,</span><br></br><span>MedsHub24/7</span></p>`
     
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
 }
  
  if (error) {
    return next(error);
  }
  
  console.log('order: ', order);
  
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
