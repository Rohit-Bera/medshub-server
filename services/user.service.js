const HttpError = require("../middlewares/HttpError");
const User = require("../models/usersModel");
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "some super secret...";

//hashing password
const hashPassword = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 8);
  return hashedPassword;
};

//token
const generateAuthToken = async (user) => {
  const token = await jwt.sign({ _id: user._id.toString() }, "newuser");
  return token;
};

//finding user for login
const findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new HttpError(404, "Invalid User!");
    console.log("error: ", error);
    return { error };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new HttpError(404, "Invalid User!");
    console.log("error: ", error);
    return { error };
  }
  return user;
};
//signup services
const signUpServices = async (signupUser) => {
  const { email } = signupUser;
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      const error = new HttpError(404, "User is already exist");
      console.log("error: ", error);
      return { error };
    }
    const user = new User(signupUser);
    console.log("user: ", user);
    const hashedPassword = await hashPassword(user);
    user.password = hashedPassword;
    await user.save();
    const token = await generateAuthToken(user);
    console.log("token: ", token);
    user.password = undefined;
    const signupuser = { signupUser, token };
    return { signupuser };
  } catch (err) {
    const error = new HttpError(
      500,
      "something went Wrong in delete user services"
    );
    console.log("error: ", error);
    return error;
  }
};

//login services
const logInServices = async (loginUser) => {
  // console.log('loginUser: ', loginUser);
  const { email, password } = loginUser;
  try {
    const user = await findByCredentials(email, password);
    console.log("user login: ", user);
    const token = await generateAuthToken(user);
    console.log("token: ", token);
    const loguser = { user, token };
    user.password = undefined;
    return { loguser };
  } catch (err) {
    const error = new HttpError(
      500,
      "something went Wrong in delete user services"
    );
    console.log("error: ", error);
    return error;
  }
};

//edit user services
const editUserServices = async (_id, data) => {
  console.log("_id: ", _id);
  console.log("data: ", data);
  try {
    const editUser = await User.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );
    console.log("editUser: ", editUser);

    if (!editUser) {
      const error = new HttpError(404, "Profile Not Found!");
      console.log("error: ", error);
      return { error };
    }
    return { editUser };
  } catch (err) {
    const error = new HttpError(
      500,
      "something went Wrong in update user services"
    );
    console.log("error: ", error);
    return error;
  }
};

//delete user services
const deleteUserServices = async (_id) => {
  try {
    const deleteUserAccount = await User.findByIdAndDelete({ _id });
    console.log("deleteUserser: ", deleteUserAccount);

    if (!deleteUserAccount) {
      const error = new HttpError(404, "Profile Not Found!");
      console.log("error: ", error);
      return { error };
    }
    return { deleteUserAccount };
  } catch (err) {
    const error = new HttpError(
      500,
      "something went Wrong in delete user services"
    );
    console.log("error: ", error);
    return error;
  }
};

const getAllUsersServices = async () => {
  try {
    const allusers = await User.find();
    if (!allusers) {
      const error = new HttpError(404, "User Not Found!");

      return { error };
    }
    return { allusers };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

const forgotPassServices = async (email) => {
  try {
    const isUser = await User.findOne({ email });
    console.log("isUser: ", isUser);
    if (!isUser) {
      const error = new HttpError(404, "User does not  exist");
      console.log("error: ", error);
      return { error };
    }

    const result = { status: 200, message: "User Found" };

    return { result };
  } catch (error) {
    const err = new HttpError(
      500,
      "something went Wrong in forget pass services"
    );
    console.log("error: ", err);
    return error;
  }
};

const resethashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  return hashedPassword;
};

const resetPassServices = async (email, password) => {
  try {
    const isUser = await User.findOne({ email });
    console.log("isUser: ", isUser);
    if (!isUser) {
      const error = new HttpError(404, "User does not  exist");
      console.log("error: ", error);
      return { error };
    }

    const { _id } = isUser;

    const hashedPassword = await resethashPassword(password);
    password = hashedPassword;

    const token = await generateAuthToken(isUser);
    console.log("token: ", token);

    const body = { email, password };

    const updatePass = await User.findByIdAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );

    console.log("updatePass: ", updatePass);

    if (updatePass) {
      const result = {
        status: "200",
        message: "user password updated",
        updatePass,
        token,
      };

      return { result };
    } else {
      const error = new HttpError(404, "password Not update!");
      console.log("error: ", error);
      return { error };
    }
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(
      500,
      "something went Wrong in forget pass services"
    );
    console.log("error: ", err);
    return error;
  }
};

module.exports = {
  signUpServices,
  logInServices,
  editUserServices,
  deleteUserServices,
  getAllUsersServices,
  forgotPassServices,
  resetPassServices,
};
