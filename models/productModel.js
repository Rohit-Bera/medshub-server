const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// name , price , image , status

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: Array,
      required: true,
    },
    availableStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
