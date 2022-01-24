const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
//controller
const {
  placeOrderController,
  myOrderController,
  cancleOrderController,
  allOrderController,
  updateOrderController,
} = require("../controllers/order.controller");

const adminCheck = require("../middlewares/adminauth");
//routes

// for admin
router.get("/allOrders", auth, adminCheck, allOrderController);
router.put("/updateOrder/:id", auth, adminCheck, updateOrderController);

// for user
router.post("/placeOrder", auth, placeOrderController);
router.get("/myOrders", auth, myOrderController);
router.delete("/cancleOrder/:id", auth, cancleOrderController);

module.exports = router;
