const HttpError = require("../middlewares/HttpError")
const User = require("../models/usersModel")
const {request,response}=require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


//hashing password
const hashPassword  = async(user)=>{
    const hashedPassword = await bcrypt.hash(user.password,8)
    return hashedPassword
}


//token
const generateAuthToken = async (user)=>{
    const token = await jwt.sign({_id:user._id.toString()},"newuser")
    return token
}

//finding user for login
const findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        const error = new HttpError(404,"Invalid User!")
        console.log('error: ', error)
        return {error}
        
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        const error = new HttpError(404,"Invalid User!")
        console.log('error: ', error)
        return {error}
    }
    return user
}
//signup services
const signUpServices = async (signupUser) =>{
    const {email}= signupUser
    try {
        const isUser = await User.findOne({email})
        if(isUser){
            const error = new HttpError(404,"User is already exist")
            console.log('error: ', error)
            return {error}
        }
        const user = new User(signupUser)
        console.log('user: ', user)
        const hashedPassword = await hashPassword(user)
        user.password = hashedPassword
        await user.save()
        const token = await generateAuthToken(user)
        console.log('token: ', token);
        user.password = undefined
        return {signupUser}
        
    } catch (err) {
        const error = new HttpError(500,"something went Wrong in delete user services");
       console.log('error: ', error);
       return error ;
    }
}


//login services
const logInServices = async (loginUser) =>{
    // console.log('loginUser: ', loginUser);
    const {email,password} = loginUser
    try {
        
        const user = await findByCredentials(email,password)
        console.log('user: ', user)
        const token = await generateAuthToken(user)
        console.log('token: ', token);
        user.password = undefined
    return {loginUser}
    } catch (err) {
        const error = new HttpError(500,"something went Wrong in delete user services");
       console.log('error: ', error);
       return error ;
    }
}

//edit user services
const editUserServices = async(_id,data)=>{
    try {
        const editUser = await User.findByIdAndUpdate({_id},{$set:data},{new:true})
        console.log('editUser: ', editUser);
        if(!editUser){
            const error = new HttpError(404,"Profile Not Found!");
            console.log('error: ', error)
            return {error}
        }
        return {editUser}
    } catch (err) {
        const error = new HttpError(500,"something went Wrong in update user services");
        console.log('error: ', error);
        return error ;
    }
}

//delete user services
const deleteUserServices = async(_id)=>{
   try {
    const deleteUserAccount = await User.findByIdAndDelete({_id})
    console.log('deleteUserser: ', deleteUserAccount);
   
    if(!deleteUserAccount){
        const error = new HttpError(404,"Profile Not Found!");
        console.log('error: ', error);
        return {error};
    }
    return {deleteUserAccount}
   } catch (err) {
       const error = new HttpError(500,"something went Wrong in delete user services");
       console.log('error: ', error);
       return error ;
   }
}
module.exports = {signUpServices,logInServices,editUserServices,deleteUserServices}