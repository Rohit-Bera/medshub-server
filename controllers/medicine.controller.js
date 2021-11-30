const Medicine = require("../models/medicineModel");
const fs = require("fs");
const { response } = require("express");
const service = require("../services/medicine.service");

const addMedicine = async (request, response, next) => {
  const { medicineName, medicinePrice, manufacturerName, availableStatus } =
    request.body;

  const reqfiles = [];

  const url = request.protocol + ":://" + request.get("host"); // for testing purpose

  // const url = "https://medshub-backend.herokuapp.com";

  if (request.files === []) {
    const nofile = new HttpError(500, "no file chosen");
    return response.json(nofile);
  }

  for (var i = 0; i < request.files.length; i++) {
    reqfiles.push(url + "/medcineimages/" + request.files[i].filename);
  }
  console.log("reqfiles: ", reqfiles);

  const medicineImage = reqfiles;

  const body = {
    medicineName,
    medicinePrice,
    medicineImage,
    manufacturerName,
    availableStatus,
  };

  const send = await service.postMedicineApi(body);

  const { newMeds, error } = send;

  if (error) {
    response.json(error);
    return next(error);
  }

  response.json({ status: "200", newMeds });
};

const getAllMedicine = async (request, response, next) => {
  const send = await service.getMedicineApi();

  const { medicines, error } = send;

  if (error) {
    return next(error);
  }

  response.json({ status: "200", medicines });
};

const updateMedicine = async (request, response, next) => {};

const deleteMedicine = async (request, response, next) => {};

const getSearchMedicine = async (request, response, next) => {
  const med = request.params.name;

  const send = await service.searchMedicineApi(med);

  const { searchmed, error } = send;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: "200", searchmed });
};

module.exports = {
  addMedicine,
  getAllMedicine,
  updateMedicine,
  deleteMedicine,
  getSearchMedicine,
};
