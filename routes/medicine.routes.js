const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

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

router.post("/addMedicine", upload.array("medicineImage", 4), addMedicine);
router.get("/getMedicine", getAllMedicine);
router.get("/getSearchMedicine/:name", getSearchMedicine);

module.exports = router;
