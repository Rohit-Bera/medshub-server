const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

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

const { addProduct, getProduct } = require("../controllers/product.controller");

router.post("/addProduct", upload.array("productImage", 5), addProduct);
router.get("/getProducts", getProduct);

module.exports = router;
