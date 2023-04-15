const tShirtModel = require("../models/teeShirtModel");
const mongoose = require("mongoose");

// TODO: DISPLAY ALL T-SHIRTS ===>

const getTshirt = async (req, res) => {
  try {
    let filter = { availability: true };

    // SETTING FILTERS ===>
    if (req.query.sizes) {
      sizes = req.query.sizes.split(",").map((size) => size.trim());
      for (let i = 0; i < sizes.length; i++) {
        if (!["Small", "Medium", "Large"].includes(sizes[i]))
          return res.status(400).json({
            message: "sizes can contain only Small, Medium and Large",
          });
      }
      filter.sizes = { $all: sizes };
    }

    if (req.query.productname) {
      filter.productname = { $regex: req.query.productname, $options: "i" };
    }
    //=========================================================================
    const product = await tShirtModel
      .find(filter)
      .select({ createdAt: 0, updatedAt: 0, deletedAt: 0, __v: 0 });

    if (product.length == 0) {
      return res
        .status(404)
        .json({ message: "No product found with that query" });
    }
    res.json({ data: product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// TODO: DISPLAY ONE T-SHIRT ===>

const getTshirtById = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!mongoose.isValidObjectId(productId))
      return res.status(400).json({ message: "ProductId not valid" });

    let productData = await tShirtModel
      .findOne({ _id: productId })
      .populate("shopId");
    if (!productData)
      return res.status(404).json({ message: "Product not exist" });

    return res.json({ message: "Successfull", data: productData });
  } catch (err) {
    return res.status(500).json({ satus: false, err: err.message });
  }
};

// TODO: T-SHIRT OF SPECIFIC VENDOR ===>

const getTshirtOfVendor = async (req, res) => {
  try {
    // Autrorization ===>
    if (!req.shopId)
      return res
        .status(403)
        .json({ message: "please register your shop first" });
    //=======================================================

    let productData = await tShirtModel.find({
      shopId: req.shopId,
      isDeleted: false,
    });
    if (productData.length == 0)
      return res.status(404).json({ message: "No products from this shop" });

    return res.json({ message: "Successfull", data: productData });
  } catch (error) {
    return res.status(500).json({ satus: false, err: err.message });
  }
};

module.exports = { getTshirt, getTshirtById, getTshirtOfVendor };
