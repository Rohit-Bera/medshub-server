const Medicine = require("../models/medicineModel");
const fs = require("fs");
const service = require("../services/medicine.service");
const HttpError = require("../middlewares/HttpError");

const addMedicine = async (request, response, next) => {
  const {
    medicineName,
    medicinePrice,
    manufacturerName,
    availableStatus,
    medicineCategory,
    medicineDescription,
  } = request.body;

  const reqfiles = [];

  const url = request.protocol + "://" + request.get("host");
  // for testing purpose

  // const url = "https://medshub-backend.herokuapp.com";

  if (request.files === []) {
    const nofile = new HttpError(500, "no file chosen");
    return response.json(nofile);
  }

  for (var i = 0; i < request.files.length; i++) {
    reqfiles.push(url + "/medicineImages/" + request.files[i].filename);
  }
  console.log("reqfiles: ", reqfiles);

  const medicineImage = reqfiles;

  const body = {
    medicineName,
    medicinePrice,
    medicineImage,
    manufacturerName,
    availableStatus,
    medicineCategory,
    medicineDescription,
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

const updateMedicine = async (request, response, next) => {
  const _id = request.params.id;
  const body = request.body;

  try {
    const check = await Medicine.findById({ _id });

    if (!check) {
      const error = new HttpError(404, "medicine not found");

      response.json(error);
      return next(error);
    }

    const {
      medicineName,
      medicinePrice,
      manufacturerName,
      medicineImage,
      availableStatus,
      medicineCategory,
      medicineDescription,
    } = body;

    if (medicineImage === undefined || medicineImage === []) {
      const reqfiles = [];

      const url = request.protocol + "://" + request.get("host");
      // const url = "https://medshub-backend.herokuapp.com";

      if (request.files === []) {
        console.log("request.files: ", request.files);
        const nofile = new HttpError(500, "no file chosen");
        response.json(nofile);
        return next(nofile);
      }

      for (var i = 0; i < request.files.length; i++) {
        reqfiles.push(url + "/medicineImages/" + request.files[i].filename);
      }

      console.log("reqfiles: ", reqfiles);

      const medicineImage = reqfiles;

      const body = {
        medicineName,
        medicinePrice,
        manufacturerName,
        medicineImage,
        availableStatus,
        medicineCategory,
        medicineDescription,
      };

      const data = { _id, body };

      const send = await service.updateMedicineApi(data);

      const { medicine, error } = send;

      if (error) {
        response.json(error);
        return next(error);
      }

      response.json({ status: "200", medicine });
    } else {
      const data = { _id, body };

      const send = await service.updateMedicineApi(data);

      const { medicine, error } = send;

      if (error) {
        response.json(error);
        return next(error);
      }

      response.json({ status: "200", medicine });
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

const deleteMedicine = async (request, response, next) => {
  const _id = request.params.id;

  const send = await service.deleteMedicineApi(_id);

  const { success, error } = send;

  if (error) {
    response.json(error);
    return next(error);
  }

  response.json({ success, status: "200" });
};

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
