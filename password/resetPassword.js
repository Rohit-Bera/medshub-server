const express = require('express')
const router = express.Router();
const User = require("../models/userModel");
const crypto = require("crypto");
const sendEmail = require("./sendEmail");
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');


//send password link

router.post ("/password",async(request,response)=>{
    try {
        const emailSchema = joi.object({
            email: joi.string().email().required().label("Email")
        });
        const {error} = emailSchema.validate(request.body);
        if(error){
            return response.status(400).send({message:error.details[0].message});

        }
        let user = await User.findOne({email:request.body.email});
        if(!user){
            return response.status(409).send({message:"User with givrn email does not exists"})
        }

    } catch (error) {
        
    }
})
module.export = router;