const User = require("../models/usersModel");
const jwt = require("jsonwetoken");

const auth = async(request,response,next)=>{
    try {
        const token = request.header("Authorization").replace("Bearer ","");
        const decoded = jwt.verify(tpken,"newuser");
        const user = await User.findOne({_id: decoded._id});
        if(!user){
            const error = new HttpError(401,"please authenticate!");
            console.log('error: ', error);
            return {error}; 
        }
        request.token = token;
        request.user = token;
        next();
    } catch (err) {
        const error = new HttpError(500,"something went Wrong in authentication");
       console.log('error: ', error);
       return error 
    }
}

module.exports = auth;