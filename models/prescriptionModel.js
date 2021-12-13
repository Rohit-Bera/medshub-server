const mongoose = require("mongoose");
// const { schema } = require("./medicineModel");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    prescriptionImage:{
        type: Array,
        required:true,
    },
    prescriptionStatus:{
        type:Boolean,
        default:false
    }
});

const Prescription = mongoose.model("Prescription",prescriptionSchema);

module.exports = Prescription;