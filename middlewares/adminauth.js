const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const HttpError = require("./HttpError");
const adminAuth = async (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "newuser");
    const user = await User.findOne({ _id: decoded._id });
    if (user.usertype !== "admin") {
      const error = new HttpError(404, "only admin can access");
      console.log("error: ", error);
      return { error };
    }
    next();
  } catch (err) {
    const error = new HttpError(
      500,
      "something went Wrong in admin authentication"
    );
    console.log("error: ", error);
    return error;
  }
};

module.exports = adminAuth;
