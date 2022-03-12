const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const adminCheck = require("../middlewares/adminauth");
//storage
const storage = multer.diskStorage({
    destination: "./upload/prescriptionimage",
    filename: (request,file, cb) => {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({
    storage : storage,
});
//controller
const {uploadPrescriptionController,allPrescriptionController,updatePrescriptionController,deletePrescriptionController} = require("../controllers/prescription.controller");

//router
router.post("/uploadPrescription",upload.array("prescriptionImage",4),auth,uploadPrescriptionController);
router.get("/getAllPrescription",auth,adminCheck,allPrescriptionController);
router.put("/updatePrescription/:id",auth,adminCheck,updatePrescriptionController);
router.delete("/deletePrescription/:id",auth,adminCheck,deletePrescriptionController);
module.exports = router;