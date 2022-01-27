const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
//controller
const {
  cartController,
  myCartController,
  cancleCartController,
} = require("../controllers/cart.conrtoller");
//routes

// for user
router.post("/addToCart", auth, cartController);
router.get("/myCart", auth, myCartController);
router.delete("/deleteFromCart/:id", auth, cancleCartController);

module.exports = router;
