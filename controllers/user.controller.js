const User = require("../models/usersModel");
const {request,response}=require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//hashing password
const hashPassword  = async(user)=>{
    const hashedPassword = await bcrypt.hash(user.password,8);
    return hashedPassword;
};


//token
const generateAuthToken = async (user)=>{
    const token = await jwt.sign({_id:user._id.toString()},"newuser");
    return token;
}




//signUp
const signUp=async(request,response,next)=>{
    const {name,email,password}=request.body;
    // console.log('request.body: ', request.body);
    try {
        const isUser = await User.findOne({email});
        if(isUser){
            return response.status(400).json({error:"User already existes!"});
        }
        const user = new User(request.body);
        console.log('user: ', user);
        const hashedPassword = await hashPassword(user);
        user.password = hashedPassword;
        await user.save();
        const token = await generateAuthToken(user);
        user.password = undefined;
        response.status(201).json({user,token});
    } catch (error) {
        return response.status(500).json({error:"somthing went Wrong!"});
    }
};

module.exports ={signUp}