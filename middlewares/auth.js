const User =  require("../models/usersModel");
const jwt = require("jsonwebtoken");

const auth = async(request,response,next)=>{
    try{
        const token = request.header("Authorization").replace("Barber","");
        const decoded = jwt.verify(tpken,"newuser");
        const user = await User.findOne({_id: decoded._id});
        if(user.usertype !== "admin"){
            const error = new HttpError(404,"only admin can changes");
            console.log('error: ', error);
            return {error}; 
        }
        next();
    }
    catch(err){
        const error = new HttpError(500,"something went Wrong in authentication");
       console.log('error: ', error);
       return error ;
    }
};

module.exports = auth;