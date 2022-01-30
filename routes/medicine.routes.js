const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const auth = require("../middlewares/auth");
const adminauth = require("../middlewares/adminauth");

const storage = multer.diskStorage({
  destination: "./upload/medicineimages",
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
  addMedicine,
  getAllMedicine,
  getSearchMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicine.controller");

// for admin
router.post(
  "/addMedicine",
  auth,
  adminauth,
  upload.array("medicineImage", 4),
  addMedicine
);
router.put(
  "/updateMedicine/:id",
  auth,
  adminauth,
  upload.array("medicineImage", 4),
  updateMedicine
);
router.delete("/deleteMedicine/:id", auth, adminauth, deleteMedicine);
router.get("/getMedicine", auth, adminauth, getAllMedicine);
// for user
router.get("/getMedicineUser", getAllMedicine);
router.get("/getSearchMedicine/:name", getSearchMedicine);

module.exports = router;
