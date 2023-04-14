const mongoose = require("mongoose");
const orderModel = require("../models/orderModel");
const teeShirtModel = require("../models/teeShirtModel");
const joi = require("joi");

//TODO: PLACING ORDER ===>
const createOrder = async (req, res) => {
  try {
    const data = req.body;

    // Validations ===>
    const orderValidationSchema = joi.object({
      quantity: joi.number().required().min(1).max(5),
    });
    const { error, value } = orderValidationSchema.validate(data, {
      abortEarly: true,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    data.productId = req.params.productId;
    if (!mongoose.isValidObjectId(data.productId))
      return res.status(400).json({ mesage: "invalid product" });
    //=======================================================================================================

    // Authorization ===>
    if (!req.userId)
      return res.status(403).json({ message: "login as a customer first" });
    data.userId = req.userId;
    //==================================================================================

    // Product Existance Check ===>
    const availableTshirt = await teeShirtModel.findOne({
      _id: data.productId,
      availability: true,
    });
    if (!availableTshirt)
      return res.status(404).json({ message: "T-Shirt out of stock" });

    if (availableTshirt.quantity < data.quantity)
      return res
        .status(422)
        .json({ message: "insufficient quantity in company inventory" });
    // 422 Unprocessable Entity
    //==============================================================================================================================

    // T-Shirt Quantity and Availability setting ===>
    let remain = availableTshirt.quantity - data.quantity;
    let available = remain != 0;

    await teeShirtModel.findByIdAndUpdate(
      data.productId,
      { quantity: remain, availability: available },
      { new: true }
    );
    //==========================================================================================================
    // Total Price setting ===>
    data.totalPrice = availableTshirt.baseprice * data.quantity;
    //==========================================================

    const generatedOrder = await orderModel.create(data);
    return res.status(201).json({ data: generatedOrder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// TODO: FETCHING ORDERS OF A USER ===>

const getOrdersOfCustomer = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res
        .status(403)
        .json({ message: "you are not authorised for this action" });

    let orders = await orderModel
      .find({ userId: userId })
      .populate("productId");
    if (orders.length == 0)
      return res.status(404).json({ message: "no orders yet" });
    return res.json({ data: orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// TODO: GET ORDER DETAILS ===>
const orderDetails = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res
        .status(403)
        .json({ message: "you are not authorised for this action" });

    const orderId = req.params.orderId;
    if (!mongoose.isValidObjectId(orderId))
      return res.status(400).json({ message: "Invalid Order Id" });

    let order = await orderModel
      .findOne({ _id: orderId, userId: userId })
      .populate("productId")
      .populate("userId");
    if (!order)
      return res
        .status(404)
        .json({ message: "you did not place any such order" });

    return res.json({ data: order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// TODO: UPDATING ORDER STATUS===>
const cancleOrder = async (req, res) => {
  try {
    const status = req.body.status;
    console.log(status);
    if (!["placed", "cancled"].includes(status))
      return res.status(400).json({ message: "invalid content" });

    const userId = req.userId;
    if (!userId)
      return res
        .status(403)
        .json({ message: "you are not authorised for this action" });

    const orderId = req.params.orderId;
    if (!mongoose.isValidObjectId(orderId))
      return res.status(400).json({ message: "Invalid Order Id" });

    let order = await orderModel
      .findOneAndUpdate(
        { _id: orderId, userId: userId, status: "pending" },
        { status: status },
        { new: true }
      )
      .populate("productId");
    if (!order)
      return res.status(404).json({ message: "can not update status" });

    return res.json({ message: "status updated successfully", data: order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrdersOfCustomer,
  orderDetails,
  cancleOrder,
};
