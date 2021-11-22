const express = require('express');
const router = express.Router();

//controllers
const {signUp} = require("../controllers/user.controller");
//routes
router.post('/signUp',signUp);
// router.post('/logIn',logIn);

module.exports = router;