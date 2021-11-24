const express = require('express');
const router = express.Router();

//controllers
const {signUp,logIn,edit,deleteUser} = require("../controllers/user.controller");
//routes
router.post('/signUp',signUp);
router.post('/logIn',logIn);
router.put('/editUser/:id',edit);
router.delete('/deleteUser/:id',deleteUser);
module.exports = router;