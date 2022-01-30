const Medicine = require("../models/medicineModel");
const fs = require("fs");
const HttpError = require("../middlewares/HttpError");

// post medicine api services
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

// get medicine api services
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

// search medicine api services
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

// update medicine api services
const updateMedicineApi = async (data) => {
  const { _id, body } = data;

  try {
    const { medicineImage } = body;
    console.log("medicineImage: ", medicineImage);

    const medicine = await Medicine.findByIdAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );

    if (!_id || !body) {
      const error = new HttpError(404, "medicine not found");
      return { error };
    }

    return { medicine };
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "something went wrong");

    return { error: err };
  }
};

// delete medicine api services
const deleteMedicineApi = async (_id) => {
  try {
    const findmed = await Medicine.findById({ _id });

    if (!findmed) {
      const error = new HttpError(404, "medicine not found");

      return { error };
    }

    const exist = await Medicine.findByIdAndDelete({ _id });
    console.log("exist: ", exist);

    const { medicineImage } = exist;

    const path = [];
    const location = [];

    for (var i = 0; i < medicineImage.length; i++) {
      path.push(medicineImage[i].slice(36, 69));
      location.push(`./upload/medicineimages${path[i]}`);
      fs.unlinkSync(location[i]);
    }

    console.log("path : ", path);
    console.log("location : ", location);

    return { success: "medicine deleted successfully" };
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "soemthing went wrong");

    return { error: err };
  }
};

module.exports = {
  postMedicineApi,
  getMedicineApi,
  searchMedicineApi,
  updateMedicineApi,
  deleteMedicineApi,
};
