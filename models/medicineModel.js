const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// name , price , image , manufacturername ,

const medicineSchema = new Schema({
  medicineName: {
    type: String,
    required: true,
  },
  medicinePrice: {
    type: Number,
    required: true,
  },
  medicineImage: {
    type: Array,
    required: true,
  },
  manufacturerName: {
    type: String,
    required: true,
  },
  medicineCategory: {
    type: String,
    required: true,
  },
  medicineDescription: {
    type: String,
    required: true,
  },
  availableStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
