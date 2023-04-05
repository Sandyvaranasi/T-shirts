const tShirtModel = require("../models/teeShirtModel");
const mongoose = require("mongoose");

const getTshirt = async (req, res) => {
  try {
    let filter = { isDeleted: false };

    // SETTING FILTERS ===>
    if (req.query.sizes) {
      sizes = req.query.sizes.split(",").map((size) => size.trim());
      for (let i = 0; i < sizes.length; i++) {
        if (!["Small", "Medium", "Large"].includes(sizes[i]))
          return res
            .status(400)
            .send({
            
              message: "sizes can contain only Small, Medium and Large",
            });
      }
      filter.sizes = { $all: sizes };
    }

    if (req.query.productname) {
      filter.productname = { $regex: req.query.productname, $options: "i" };
    }
    //===================================================================================================================================================================
    const product = await tShirtModel
      .find(filter)
      .select({ createdAt: 0, updatedAt: 0, deletedAt: 0, __v: 0 });

    if (product.length == 0) {
      return res
        .status(404)
        .json({ message: "No product found with that query" });
    }
    res.status(200).json({ data: product });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getTshirtById = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!mongoose.isValidObjectId(productId))
      return res
        .status(400)
        .send({ message: "ProductId not valid" });

    let productData = await tShirtModel
      .findOne({ _id: productId, isDeleted: false })
      .populate("shopId");
    if (!productData)
      return res
        .status(404)
        .send({ message: "Product not exist" });

    return res
      .status(200)
      .send({ message: "Successfull", data: productData });
  } catch (err) {
    return res.status(500).send({ satus: false, err: err.message });
  }
};

// TODO: T-SHIRT OF SPECIFIC VENDOR ===>

const getTshirtOfVendor = async (req,res)=>{
  try{
    const vendorId = req.params.vendorId;
    if (!mongoose.isValidObjectId(vendorId))
      return res
        .status(400)
        .send({ message: "vendorId not valid" });

    let productData = await tShirtModel
      .find({ shopId: vendorId, isDeleted: false });
    if (productData.length==0)
      return res
        .status(404)
        .send({ message: "No products from this shop" });

    return res
      .status(200)
      .send({ message: "Successfull", data: productData });
  }catch(error){
    return res.status(500).send({ satus: false, err: err.message });
  }
}

module.exports = { getTshirt, getTshirtById, getTshirtOfVendor };
