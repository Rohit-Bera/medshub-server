const { request } = require("http");
const fs = require("fs");
const orderServices = require("../services/order.service");
const nodemailer = require("nodemailer");
require("dotenv").config();
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Medicine = require("../models/medicineModel");
const easyinvoice = require("easyinvoice");


//placeorder controller
const placeOrderController = async (request, response, next) => {             
  const { productId, medicineId } = request.query;
  const user = request.user;

  const _id = user._id;
  const email = user.email;
  const username = user.name;
  const address = user.address;
  const data = { productId, medicineId, _id,email,username,address };
  const data1 = await orderServices.placeOrderServices(data);
  const { order, error } = data1;
  const {product,medicine} = order
 if(product)
 {
  const prod = await Product.findOne();
  const {productName,productPrice,productBrand, productDescription} = prod;
  var datas = {
    
    
    // "images":{
    //   "logo": "https://localhost:5500/logo/logo.png",
    // } ,//or base64
   
    "sender": {
        "company": "MedsHub24/7",
        "address": "Gls University",
        "zip": "380006",
        "city": "Ahmedabad",
        "country": "India"
        
    },
    "client": {
        "company": username,
        "address": address,
        "zip": "380006",
        "city": "Ahmedabad",
        "country": "India"
       
    },
    "information": {
      "number": "2022.0001",
      "date": "11-03-2022",
    },
   
    "products": [
        {
            "quantity": "1",
            "description": productName,
            "tax-rate": 18,
            "price": productPrice,
        },
       
    ],
    "bottomNotice": "Kindly pay your invoice within 15 days.",
    "settings":{
      "currency": "INR",
      "tax-notation": "gst",
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
     
    },
};
  
  //Create your invoice! Easy!
  easyinvoice.createInvoice(datas, async function (result) {
    console.log(result.pdf);
    await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
  });
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
      <span>--------------------------------------------------</span><br></br>
      </p>

     
       <p>We hope you enjoyed shopping with us.</p>
       <br></br><br></br><br></br>
       <p><span>Thanks and Regards,</span><br></br><span>MedsHub24/7</span></p>
       `,
       attachments:[
        {
          path: 'invoice.pdf'
      },
       ]
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
  var datas = {
    
    
    // "images":{
    //   "logo": "https://localhost:5500/logo/logo.png",
    // } ,//or base64
   
    "sender": {
        "company": "MedsHub24/7",
        "address": "Gls University",
        "zip": "380006",
        "city": "Ahmedabad",
        "country": "India"
        
    },
    "client": {
        "company": username,
        "address": address,
        "zip": "380006",
        "city": "Ahmedabad",
        "country": "India"
       
    },
    "information": {
      "number": "2022.0001",
      "date": "11-03-2022",
    },
   
    "products": [
        {
            "quantity": "1",
            "description": medicineName,
            "tax-rate": 18,
            "price": medicinePrice,
        },
       
    ],
    "bottom-notice": "Thank You for ordering with us Please visit again! ",
    "settings":{
      "currency": "INR",
      "tax-notation": "gst",
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
     
    },
};
  
  //Create your invoice! Easy!
  easyinvoice.createInvoice(datas, async function (result) {
    console.log(result.pdf);
    await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
  });
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
       <p><span>Thanks and Regards,</span><br></br><span>MedsHub24/7</span></p>`,
       attachments:[
        {   // filename and content type is derived from path
          path: 'invoice.pdf'
      },
       ]
     
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

  console.log("order: ", order);
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
  const user = request.user;
  console.log('user: ', user);
  const details = await Order.findById({_id}).populate("product").populate("medicine");
  console.log('details: ', details);
  const name = user.name;
  const email = user.email;
  
  const data = await orderServices.cancleOrderServices(_id);
  const { cancleOrder, error } = data;
  if(cancleOrder && cancleOrder.medicine ){
   const medicineName = details.medicine.medicineName;
   const medicineDescription = details.medicine.medicineDescription;
   const medicinePrice = details.medicine.medicinePrice;
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
      html:`<p>Hello ${name}<b></b>,</p>
      <p>you cancelled your Order!
      </p>
      <p>Your Order Details</p><hr></hr>
      <p><span>--------------------------------------------------</span><br></br>
      <span>Medicine Name : "${medicineName}"</span><br></br>
        <span>--------------------------------------------------</span><br></br>
        <span>Medicine Description : "${medicineDescription}"</span><br></br>
        <span>--------------------------------------------------</span><br></br>
        <span>Medicine Price : "${medicinePrice}"</span><br></br>
        <span>--------------------------------------------------</span><br></br>
        </p>
      <P>if you have any questions or need further information about your medicine than 
      so you can contact us on our website.<p/>
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
  else if(cancleOrder && cancleOrder.product ){
    const productName = details.product.productName;
    const productBrand = details.product.productBrand;
    const  productDescription = details.product.productDescription;
    const productPrice = details.product.productPrice;
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
      html:`<p>Hello ${name}<b></b>,</p>
      <p>you cancelled your Order!
      </p>
      <p>Your Order Details</p><hr></hr>
      <p><span>--------------------------------------------------</span><br></br>
     <span>Product Name : "${productName}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <span>Product Brand : "${productBrand}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <spanProduct Description : "${productDescription}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <span>Product Price : "${productPrice}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      </p>
      <P>if you have any questions or need further information about your medicine than 
      so you can contact us on our website.<p/>
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
 
  
  const data1 = { _id, data };
  const user = await Order.findById({_id}).populate("owner").populate("product").populate("medicine");
  console.log('user: ', user);
  const name = user.owner.name;
  const email = user.owner.email;
  
  const product = user.product
  console.log('product: ', product);
  const medicine = user.medicine
  console.log('medicine: ', medicine);
  
  

  const update = await orderServices.updateOrderServices(data1);
  const { updateOrder, error } = update;
  
  if(updateOrder && updateOrder.medicine ){
    const medicineName = user.medicine.medicineName;
    const medicineDescription = user.medicine.medicineDescription;
    const medicinePrice = user.medicine.medicinePrice;
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
      html:`<p>Hello ${name}<b></b>,</p>
      <p>Your Medicine Order is Shipped You will get in one or two days.
      </p>
      <p>Your Order Details</p><hr></hr>
      <p><span>--------------------------------------------------</span><br></br>
      <span>Medicine Name : "${medicineName}"</span><br></br>
        <span>--------------------------------------------------</span><br></br>
        <span>Medicine Description : "${medicineDescription}"</span><br></br>
        <span>--------------------------------------------------</span><br></br>
        <span>Medicine Price : "${medicinePrice}"</span><br></br>
        <span>--------------------------------------------------</span><br></br>
        </p>
      <P>if you have any questions or need further information about your medicine than 
      so you can contact us on our website.<p/>
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
  else if(updateOrder && updateOrder.product ){
    const productName = user.product.productName;
    const productBrand = user.product.productBrand;
    const productDescription = user.product.productDescription;
    const productPrice = user.product.productPrice;
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
      html:`<p>Hello ${name}<b></b>,</p>
      <p>Your product Order is Shipped You will get in one or two days.
      </p>
      <p>Your Order Details</p><hr></hr>
      <p><span>--------------------------------------------------</span><br></br>
     <span>Product Name : "${productName}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <span>Product Brand : "${productBrand}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <spanProduct Description : "${productDescription}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      <span>Product Price : "${productPrice}"</span><br></br>
      <span>--------------------------------------------------</span><br></br>
      </p>
      <P>if you have any questions or need further information about your medicine than 
      so you can contact us on our website.<p/>
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


