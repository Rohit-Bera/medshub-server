const { response } = require("express");
const { request } = require("http");
const profileService = require("../services/user.service");

//signUp
const signUp = async (request, response, next) => {
  const { name, email, password, address, phoneNumber } = request.body;
  console.log("request.body: ", request.body);
  const data = await profileService.signUpServices(request.body);
  const { signupuser, error } = data;
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
const getAllUsers = async(request,response,next)=>{
  const user = await profileService.getAllUsersServices();
  const {allusers,error} = user;
  if (error) {
    return next(error);
  }
  response.json({status:"200",allusers})
}
//forgotpassword
const forgotPass = async(request,response,next)=>{

  const { email } = request.body;
  console.log('email: ', email);
  const data = await profileService.forgotPassServices(email);
  const {link,error} = data; 
  if (error) {
    return next(error);
  }
  response.json({status:"200",link})
}
const resetPass = async(request,response,next)=>{
  const { email } = request.body;
  const _id = request.params.id;
  const token = request.params.token;
  const data = await profileService.resetPassServices(_id,token,email);
}


module.exports = { signUp, logIn, edit, deleteUser, getAllUsers,forgotPass,resetPass };
