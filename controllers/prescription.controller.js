// const { request } = require("http");
// const HttpError = require("../middlewares/HttpError");
// const Prescription = require("../models/prescriptionModel");
const PrescriptionServices = require("../services/prescription.service");
const HttpError = require("../middlewares/HttpError");
const { request } = require("http");

// upload prescription controller
const uploadPrescriptionController = async (request, response, next) => {
  const user = request.user;
  const _id = user._id;
  console.log("_id: ", _id);
  const reqfiles = [];

  const url = request.protocol + "://" + request.get("host");

  if (request.files === []) {
    const error = new HttpError(500, "no file choose");
    return response.json(error);
  }

  for (var i = 0; i < request.files.length; i++) {
    reqfiles.push(url + "/prescriptionimage/" + request.files[i].filename);
  }
  console.log("reqfiles: ", reqfiles);
  const prescriptionImage = reqfiles;

  const body = { prescriptionImage, _id };
  console.log("body: ", body);

  const data = await PrescriptionServices.uploadPrescriptionServices(body);

  const { prescription, error } = data;
  console.log("data: ", data);

  if (error) {
    return next(error);
  }
  response.json({ status: "200", prescription });
};

//get all prescription
const allPrescriptionController = async (request, response, next) => {
  const data = await PrescriptionServices.allPrescriptionService();
  const { allPrescription, error } = data;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", allPrescription });
};

//update Prescription
const updatePrescriptionController = async (request, response, next) => {
  const _id = request.params.id;
  console.log("_id: ", _id);
  const data = request.body;
  console.log("data: ", data);

  const data1 = { _id, data };
  const update = await PrescriptionServices.updatePrescriptionServices(data1);
  const { updatePrescription, error } = update;
  if (error) {
    console.log("error: ", error);
    return next(error);
  }
  response.json({ status: "200", updatePrescription });
};
module.exports = {
  uploadPrescriptionController,
  allPrescriptionController,
  updatePrescriptionController,
};
