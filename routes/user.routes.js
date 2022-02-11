const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminauth")

//controllers
const {signUp,logIn,edit,deleteUser,getAllUsers} = require("../controllers/user.controller");
//routes
router.post('/signUp',signUp);
router.post('/logIn',logIn);
router.put('/editUser/:id',auth,edit);
router.delete('/deleteUser/:id',auth,adminAuth,deleteUser);
router.get('/getAllUsers',adminAuth,getAllUsers)
module.exports = router;