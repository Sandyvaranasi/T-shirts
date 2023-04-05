const shopModel = require("../models/shopModel.js");
const tShirtModel = require("../models/teeShirtModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadImage } = require("../midWare/aws.js");
const joi = require("joi");

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
      city: joi.string().required(),
      pincode: joi.number().required(),
    });

    const { error, value } = userValidationSchema.validate(data, {
      abortEarly: true,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    //========================================================================================================================================================================================

    // password encryption ===>
    data.password = await bcrypt.hash(data.password, 12);
    //=====================================================

    // UNIQUE CHECK ===>
    const unique = await shopModel.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });
    if (unique) {
      if (unique.email == data.email)
        return res.status(400).send({ message: "email already in use" });
      if (unique.phone == data.phone)
        return res.status(400).send({ message: "phone already in use" });
    }
    //===================================================================================================================

    const createdUser = await shopModel.create(data);
    res.status(201).send({ message: "success", data: createdUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// TODO: VENDOR LOG IN FEATURE ===>
const vendorlogin = async function (req, res) {
  try {
    let { email, password } = req.body;
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({ message: "Please send mandatory field" });
    }
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
      return res.status(400).send(error.details[0].message);
    }
    //=========================================================================================================================================================================

    // EXISTANCE CHECK ===>
    let isShopExist = await shopModel.findOne({ email: email });
    if (!isShopExist)
      return res
        .status(401)
        .send({ message: "Email Id and password are incorrect" });
    //================================================================================================================

    // PASWORD MATCHING ===>
    const matchPass = await bcrypt.compare(password, isShopExist.password);
    if (!matchPass)
      return res.status(400).json({ message: "Password is wrong" });
    //===========================================================================================

    const shopToken = jwt.sign({ userId: isShopExist._id }, "secretKey");

    return res.status(200).send({
      message: "Success",
      data: {
        shopToken: shopToken,
        userId: isShopExist._id,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
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
    });
    const { error, value } = userValidationSchema.validate(data, {
      abortEarly: true,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // AUTHORISATION AND REF ADDING ==>
    if (!req.shopId)
      return res
        .status(403)
        .send({ message: "please register your shop first" });
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
        return res.status(400).send({ message: "only one file required" });
      if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/.test(files[0]["originalname"]))
        return res.status(400).send({ message: "invalid file format" });

      let imageUrl = await uploadImage(files[0]);
      data.productImage = imageUrl;
    } else {
      return res.status(400).send({ message: "Product Image is mandatory" });
    }
    //======================================================================================================================================

    const tshirt = await tShirtModel.create(data);

    return res.status(201).send({ data: tshirt });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


module.exports.createVendor = createVendor;
module.exports.vendorlogin = vendorlogin;
module.exports.createTshirt = createTshirt;
