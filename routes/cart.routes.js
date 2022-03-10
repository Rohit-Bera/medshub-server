const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
//controller
const {
  postCartProdController,
  postCartMedController,
  myCartController,
  cancleCartController,
} = require("../controllers/cart.conrtoller");
//routes

// for user
router.post("/addProdToCart", auth, postCartProdController);
router.post("/addMedToCart", auth, postCartMedController);
router.get("/myCart", auth, myCartController);
router.delete("/deleteFromCart/:id", auth, cancleCartController);

module.exports = router;
