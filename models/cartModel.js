const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    medicine: {
      type: Schema.Types.ObjectId,
      ref: "Medicine",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
