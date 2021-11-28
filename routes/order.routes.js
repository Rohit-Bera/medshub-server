const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {placeOrder} = require("../controllers/order.controller");

const adminCheck = require("../middlewares/adminauth");

router.post("/placeOrder",auth,placeOrder);