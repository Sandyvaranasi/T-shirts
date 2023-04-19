const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("joi");

// TODO SIGNUP FEATURE ===>
const createUser = async function (req, res) {
  try {
    const data = req.body;

    // VALIDATIONS ===>

    const userValidationSchema = joi.object({
      name: joi.string().required(),
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
      landMark: joi.string(),
      city: joi.string().required(),
      pincode: joi.number().required(),
    });

    const { error, value } = userValidationSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    //===========================================================================================================================================================================================

    // PASSWORD ENCRYPTION ===>
    data.password = await bcrypt.hash(data.password, 12);
    //=====================================================

    // UNIQUE CHECK ===>
    const unique = await userModel.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });
    if (unique) {
      if (unique.email == data.email)
        return res
          .status(400)
          .send({ message: "email already in use" });
      if (unique.phone == data.phone)
        return res.status(400).send({ message: "phone already in use" });
    }
    //=================================================================================================================

    const createdUser = await userModel.create(data);
    res
      .status(201)
      .send({ message: "success", data: createdUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// TODO: LOGIN FEATURE ===>
const login = async function (req, res) {
  try {
    let data = req.body;

    //validation of email password ===>
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
      return res.status(400).send({ message: error.details[0].message });
    }
    //==========================================================================================================================================================================

    // EXHISTANCE CHECK ===>
    let isUserExist = await userModel.findOne({ email: data.email });
    if (!isUserExist)
      return res
        .status(401)
        .send({ message: "Email Id or password is incorrect" });
    //========================================================================================================================

    // PASSWORD MATCHING ===>
    const matchPass = await bcrypt.compare(data.password, isUserExist.password);
    if (!matchPass)
      return res
        .status(400)
        .json({ message: "Email Id or password is incorrect" });
    //========================================================================================================================

    const userToken = jwt.sign({ userId: isUserExist._id }, "secretKey", {
      expiresIn: 3600 * 24,
    });

    return res.status(200).send({
      status: true,
      message: "Success",
      data: {
        userToken: userToken,
        userId: isUserExist._id,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// TODO: GET USER
const getUser = async (req, res) => {
  try {
    // Authorization
    if (!req.userId)
      return res
        .status(403)
        .json({ message: "You are unauthororized for this action" });
    //==============================================================================================

    const user = await userModel.findById(req.userId);
    return res.json({ data: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
//=======================================================================================================

//TODO: UPDATE USER

const editProfile = async (req, res) => {
  try {
    const data = req.body;
    if (Object.values(data).length == 0)
      return res.status(400).json({ message: "give any field to update" });
    // Authorization ===>
    if (!req.userId)
      return res
        .status(403)
        .json({ message: "you are not authorised for this action" });
    //===================================

    // VALIDATIONS ===>

    const userValidationSchema = joi.object({
      phone: joi.string().regex(/^[6-9][0-9]{9}$/),
      email: joi.string().regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
      password: joi
        .string()
        .min(8)
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        ),
      street: joi.string(),
      landMark: joi.string(),
      city: joi.string(),
      pincode: joi.number(),
    });

    const { error, value } = userValidationSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    //===========================================================================================================================================================================================

    // PASSWORD ENCRYPTION ===>
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }
    //=====================================================

    // UNIQUE CHECK ===>
    if (data.email || data.phone) {
      const unique = await userModel.findOne({
        $or: [{ email: data.email }, { phone: data.phone }],
      });
      if (unique) {
        if (unique.email == data.email)
          return res
            .status(400)
            .json({ message: "email already in use" });
        if (unique.phone == data.phone)
          return res.status(400).json({ message: "phone already in use" });
      }
    }
    //=================================================================================================================

    const editUser = await userModel.findByIdAndUpdate(
      { _id: req.userId },
      data,
      { new: true }
    );
    if (!editUser) res.status(404).json({ message: "No such user found" });
    res.status(200).json({ data: editUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, login, getUser, editProfile };
