const shopModel = require("../models/shopModel.js");
const tShirtModel = require("../models/teeShirtModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadImage } = require("../midWare/aws.js");
const joi = require("joi");
const mongoose = require("mongoose");

// TODO: SHOP REGISTRATION ===>

const createVendor = async function (req, res) {
  try {
    const data = req.body;

    // VALIDATIONS ===>
    const userValidationSchema = joi.object({
      ownername: joi.string().required(),
      shop: joi.string().required(),
      phone: joi
        .string()
        .required()
        .regex(/^[6-9][0-9]{9}$/),
      email: joi
        .string()
        .required()
        .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
      password: joi
        .string()
        .required()
        .min(8)
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        ),
      street: joi.string().required(),
      landmark: joi.string(),
      city: joi.string().required(),
      pincode: joi.number().required(),
    });

    const { error, value } = userValidationSchema.validate(data, {
      abortEarly: true,
    });

    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    //=====================================================================

    // password encryption ===>
    data.password = await bcrypt.hash(data.password, 12);
    //=====================================================

    // UNIQUE CHECK ===>
    const unique = await shopModel.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });
    if (unique) {
      if (unique.email == data.email)
        return res.status(400).json({ message: "email already in use" });
      if (unique.phone == data.phone)
        return res.status(400).json({ message: "phone already in use" });
    }
    //==========================================================================

    const createdUser = await shopModel.create(data);
    res.status(201).json({ message: "success", data: createdUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TODO: VENDOR LOG IN FEATURE ===>

const vendorlogin = async function (req, res) {
  try {
    let data = req.body;

    //validation of email and password
    const userValidationSchema = joi.object({
      email: joi
        .string()
        .required()
        .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
      password: joi
        .string()
        .required()
        .min(8)
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        ),
    });

    const { error, value } = userValidationSchema.validate(data, {
      abortEarly: true,
    });

    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    //================================================================================

    // EXISTANCE CHECK ===>
    let isShopExist = await shopModel.findOne({ email: data.email });
    if (!isShopExist)
      return res
        .status(401)
        .json({ message: "Email Id and password are incorrect" });
    //================================================================================================================

    // PASWORD MATCHING ===>
    const matchPass = await bcrypt.compare(data.password, isShopExist.password);
    if (!matchPass)
      return res.status(400).json({ message: "Password is wrong" });
    //===========================================================================================

    const shopToken = jwt.sign({ userId: isShopExist._id }, "secretKey");

    return res.json({
      message: "Success",
      data: {
        shopToken: shopToken,
        userId: isShopExist._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TODO: T-SHIRT CREATION FEATURE ===>

const createTshirt = async function (req, res) {
  try {
    const data = req.body;
    const files = req.files;

    // VALIDATIONS ===>

    const userValidationSchema = joi.object({
      productname: joi.string().required(),
      baseprice: joi.number().required().min(1),
      sizes: joi.string().required(),
      colors: joi.string(),
      description: joi.string().required().min(10),
      quantity: joi.number().required().min(1),
    });
    const { error, value } = userValidationSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    // AUTHORISATION AND REF ADDING ==>
    if (!req.shopId)
      return res
        .status(403)
        .json({ message: "please register your shop first" });
    data.shopId = req.shopId;
    //============================================================================================

    // Changing Sizes and Colors to array ===>
    let str = "";
    for (let i of data.sizes) {
      if (i != " ") str += i;
    }
    data.sizes = str.split(",");

    if (data.colors) {
      let color = "";
      for (let i of data.colors) {
        if (i != " ") color += i;
      }
      data.colors = color.split(",");
    }
    //===========================================================================

    // ADDING IMAGE TO AWS ===>

    if (files && files.length > 0) {
      if (files.length > 1)
        return res.status(400).json({ message: "only one file required" });
      if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/.test(files[0]["originalname"]))
        return res.status(400).json({ message: "invalid file format" });

      let imageUrl = await uploadImage(files[0]);
      data.productImage = imageUrl;
    } else {
      return res.status(400).json({ message: "Product Image is mandatory" });
    }
    //=============================================================================

    const tshirt = await tShirtModel.create(data);

    return res.status(201).json({ data: tshirt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TODO: UPDATE AVAILABILITY, PICTURE, PRICE, SIZE AND COLORS OF T-SHIRT ===>

const updateTshirt = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;
    const tShirtId = req.params.tShirttId;

    if (Object.keys(data).length == 0)
      return res.status(400).json({ message: "give some data to update" });

    // VALIDATIONS ===>

    const userValidationSchema = joi.object({
      baseprice: joi.number().min(1),
      sizes: joi.string(),
      colors: joi.string(),
      availability: joi.boolean(),
    });
    const { error, value } = userValidationSchema.validate(data, {
      abortEarly: true,
    });

    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    //=======================================================================

    // AUTHORISATION AND REF ADDING ==>

    if (!req.shopId)
      return res
        .status(403)
        .json({ message: "please register your shop first" });

    //============================================================================================

    // Changing Sizes and Colors to array ===>
    if (data.sizes) {
      let str = "";
      for (let i of data.sizes) {
        if (i != " ") str += i;
      }
      data.sizes = str.split(",");
    }

    if (data.colors) {
      let color = "";
      for (let i of data.colors) {
        if (i != " ") color += i;
      }
      data.colors = color.split(",");
    }

    //===========================================================================

    // ADDING IMAGE TO AWS ===>

    if (files && files.length > 0) {
      if (files.length > 1)
        return res.status(400).json({ message: "only one file required" });
      if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/.test(files[0]["originalname"]))
        return res.status(400).json({ message: "invalid file format" });

      let imageUrl = await uploadImage(files[0]);
      data.productImage = imageUrl;
    }
    //======================================================================================================
    const tshirt = await tShirtModel.findOneAndUpdate(
      { _id: tShirtId, shopId: req.shopId },
      data,
      { new: true }
    );

    return res.json({ data: tshirt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TODO: GET SHOP DETAILS
const getShopDetails = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    if (!mongoose.isValidObjectId(shopId))
      return res.status(400).json({ message: "invalid shopId" });

    if (!req.shopId)
      return res
        .status(403)
        .json({ message: "please register your shop first" });

    //============================================================================================

    let details = await shopModel.findById(req.shopId).select({__v:0,password:0});
    if (!details)
      return res.status(404).json({ message: "No such shops found" });

    return res.json({ data: details });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVendor,
  vendorlogin,
  createTshirt,
  updateTshirt,
  getShopDetails,
};
