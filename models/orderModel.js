const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product:{
       type:Schema.Types.ObjectId,
        ref:"Product",
    },
    medicine: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    deliverystatus:{
        type:Boolean,
        require:true,
        default : false,
    },
},
    {timestamps:true}
);

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;