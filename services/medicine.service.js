const Medicine = require("../models/medicineModel");
const fs = require("fs");
const HttpError = require("../middlewares/HttpError");

const postMedicineApi = async (body) => {
  console.log("body: ", body);

  const { medicineName } = body;

  try {
    const exist = await Medicine.findOne({ medicineName });

    if (exist) {
      const error = new HttpError(404, "medicine found in database");

      return { error };
    }

    const newMeds = new Medicine(body);
    await newMeds.save();

    return { newMeds };
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "something went wrong");
    return { error: error };
  }
};

const getMedicineApi = async () => {
  try {
    const medicines = await Medicine.find();

    if (!medicines) {
      const error = new HttpError(404, "medicine not found");

      return { error };
    }

    return { medicines };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

const searchMedicineApi = async (name) => {
  console.log("name: ", name);
  try {
    const medicineName = new RegExp(name, "i");

    const searchmed = await Medicine.find({ medicineName });
    console.log("searchmed: ", searchmed);

    if (searchmed === null || searchmed === undefined) {
      const error = new HttpError(404, "product not found");

      return { error };
    }

    return { searchmed };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

module.exports = { postMedicineApi, getMedicineApi, searchMedicineApi };
