const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const HttpError = require("../middlewares/HttpError");

const auth = async (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "newuser");
    const user = await User.findOne({ _id: decoded._id });
    // console.log('user: ', user);
    if (!user) {
      const error = new HttpError(401, "please authenticate!");
      console.log("error: ", error);
      return { error };
    }
    request.token = token;
    request.user = user;
    // console.log('request.user: ', request.user);
    next();
  } catch (err) {
    const error = new HttpError(500, "something went Wrong in authentication");
    response.json(error);
    console.log("error in auth: ", err);
    return error;
  }
};

module.exports = auth;
