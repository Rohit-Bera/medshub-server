const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");
const adminauth = require("../middlewares/adminauth");

//image storing

const storage = multer.diskStorage({
  destination: "./upload/productimages",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getSearchProduct,
  getSearchProductbyBrand,
  getSearchProductbyCategory,
} = require("../controllers/product.controller");

// for admin
router.post(
  "/addProduct",
  auth,
  adminauth,
  upload.array("productImage", 4),
  addProduct
);
router.get("/getAllProducts", auth, adminauth, getAllProduct);

router.put(
  "/updateProduct/:id",
  auth,
  adminauth,
  upload.array("productImage", 4),
  updateProduct
);
router.delete("/deleteProduct/:id", auth, adminauth, deleteProduct);

// for user
router.get("/getProducts", getProduct);
router.get("/getAllProducts", getAllProduct);
router.get("/getSearchProduct/:name", getSearchProduct);
router.get("/getSearchProductbyBrand/:brand", getSearchProductbyBrand);
router.get("/searchProductbyCategory/:category", getSearchProductbyCategory);

module.exports = router;
