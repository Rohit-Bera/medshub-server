const { response } = require("express");
const { request } = require("http");
const profileService = require("../services/user.service");
const nodemailer = require("nodemailer");
require("dotenv").config();

//signUp
const signUp = async (request, response, next) => {
  const { name, email, password, address, phoneNumber } = request.body;
  console.log("request.body: ", request.body);
  const data = await profileService.signUpServices(request.body);
  const { signupuser, error } = data;
  if(signupuser){
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
      html:`<p>Hello <b>${name}</b>,</p>
      <p>You have succssfully registered with us. Now You can access all Services of Medshub24/7.</p>
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
  if (error) {
    return next(error);
  }
  response.json({ status: "200", signupuser });
};

//login
const logIn = async (request, response, next) => {
  const { email, password } = request.body;
  console.log("password: ", password);
  console.log("email: ", email);

  const data = await profileService.logInServices(request.body);
  const { loguser, error } = data;
  console.log("loguser: ", loguser);
  if (error) {
    return next(error);
  }
  loguser
    ? response.json({ status: "200", loguser })
    : response.json({ status: "404", error });
};
//update user
const edit = async (request, response, next) => {
  const _id = request.params.id;
  const data = request.body;
  const update = await profileService.editUserServices(_id, data);
  const { editUser, error } = update;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", editUser });
};
//delete user
const deleteUser = async (request, response, next) => {
  const _id = request.params.id;
  console.log("_id: ", _id);
  const del = await profileService.deleteUserServices(_id);
  const { deleteUserAccount, error } = del;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", deleteUserAccount });
};
//get all user
const getAllUsers = async (request, response, next) => {
  const user = await profileService.getAllUsersServices();
  const { allusers, error } = user;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", allusers });
};
//forgotpassword
const forgotPass = async (request, response, next) => {
  const { email } = request.body;
  console.log("email: ", email);
  const data = await profileService.forgotPassServices(email);
  const { result, error } = data;
  console.log("result: ", result);
  if (error) {
    response.json({ error });

    return next(error);
  }
  response.json({ result });
};
const resetPass = async (request, response, next) => {
  const { email, password } = request.body;

  const data = await profileService.resetPassServices(email, password);

  const { result, error } = data;

  if (error) {
    response.json({ error });
    return next(error);
  }
  response.json({ result });
};

module.exports = {
  signUp,
  logIn,
  edit,
  deleteUser,
  getAllUsers,
  forgotPass,
  resetPass,
};
