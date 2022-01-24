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
  // console.log('request.body: ', request.body);
  const data = await profileService.logInServices(request.body);
  const { loguser, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", loguser });
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

module.exports = { signUp, logIn, edit, deleteUser };
