const express = require("express");
const {
  addWishlistProduct,
  getWishlist,
  removeFromWishlist,
  addWishlistMedicine,
} = require("../controllers/wishlist.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

// prods
router.post("/addtoWishlistProduct", auth, addWishlistProduct);
router.get("/getMyWishlist", auth, getWishlist);
router.delete("/removeFromWishlist/:id", auth, removeFromWishlist);

// meds
router.post("/addtoWishlistMedicine", auth, addWishlistMedicine);

module.exports = router;
