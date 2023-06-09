const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: ObjectId,
      ref: "tshirt",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      minLength: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "placed", "cancled"],
    },
    address:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
