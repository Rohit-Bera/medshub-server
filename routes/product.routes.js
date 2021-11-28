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

const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getSearchProduct,
} = require("../controllers/product.controller");

router.post("/addProduct", upload.array("productImage", 5), addProduct);
router.get("/getProducts", getProduct);
router.put(
  "/updateProduct/:id",
  upload.array("productImage", 5),
  updateProduct
);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getAllProducts", getAllProduct);
router.get("/getSearchProduct/:name", getSearchProduct);

module.exports = router;
