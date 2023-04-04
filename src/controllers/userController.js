const userModel = require('../models/userModel.js');
const validation = require("../validations.js")
const jwt = require('jsonwebtoken')
//const mongoose=require('mongoose')

const createUser = async function (req, res) {
    try {
        const userData = req.body

        if (Object.keys(userData).length==0) {
            return res.status(400).send({status:false,message:"Please send mandatory field"})
        }

        if (!userData.name || userData.name.trim() == "") return res.status(400).send({ status: false, message: "name is mandatory" })
        if (typeof (userData.name) !== 'string') return res.status(400).send({ status: false, message: "wrong format of name" })
        if (!validation.validate(userData.name.trim())) return res.status(400).send({ status: false, message: "invalid name" })

         userData.phone.trim()
        if (!userData.phone) return res.status(400).send({ status: false, message: "phone is mandatory" })
        if (typeof (userData.phone) !== "string") return res.status(400).send({ status: false, message: "wrong format of phone" })
        if (!validation.validatePhone(userData.phone)) return res.status(400).send({ status: false, message: "invalid phone number" })

         userData.email.trim()
        if (!userData.email) return res.status(400).send({ status: false, message: "email is mandatory" })
        if (typeof (userData.email) !== "string") return res.status(400).send({ status: false, message: "wrong format of email" })
        if (!validation.validateEmail(userData.email)) return res.status(400).send({ status: false, message: "invalid email address" })

        if (!userData.password) return res.status(400).send({ status: false, message: "password is mandatory" })
        if (typeof (userData.password) !== "string") return res.status(400).send({ status: false, message: "wrong format of password" })
        if (!validation.validatePassword(userData.password)) return res.status(400).send({ status: false, message: "Please send  8 to 15 length Alphanumeric with one Special Character Password" })
        if(userData.password.length<8||userData.password.length>15) return res.status(400).send({ status: false, message: "Please send  8 to 15 length Alphanumeric with one Special Character Password" })

        if(!userData.street||userData.street.trim()=='') return res.status(400).send({ status: false, message: "fill up the street" })
        if(!userData.city||userData.city.trim()=='') return res.status(400).send({ status: false, message: "fill up the city" })
        if(!userData.pincode||userData.pincode.trim()=='') return res.status(400).send({ status: false, message: "fill up the pincode" })


        const unique = await userModel.findOne({ $or: [{ email: userData.email }, { phone: userData.phone }] })
        if (unique) {
            if (unique.email == userData.email) return res.status(400).send({ status: false, message: "email already in use" })
            if (unique.phone == userData.phone) return res.status(400).send({ status: false, message: "phone already in use" })
        }
        const createdUser = await userModel.create(userData);
        res.status(201).send({ status: true, message: "success", data: createdUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const login = async function (req, res) {
    try {
        let { email, password } = req.body
        if (Object.keys(req.body).length==0) {
            return res.status(400).send({status:false,message:"Please send mandatory field"})
        }
    //validation of email
    if (!email || email.trim()=="") return res.status(400).send({ status: false, message: "email is mandatory" })
    if (typeof (email) !== "string") return res.status(400).send({ status: false, message: "wrong format of email" })
    if (!validation.validateEmail(email)) return res.status(400).send({ status: false, message: "invalid email address" })
    //validation of password
    if (!password || password.trim()=="") return res.status(400).send({ status: false, message: "password is mandatory" })
    if (typeof (password) !== "string") return res.status(400).send({ status: false, message: "wrong format of password" })
    if (!validation.validatePassword(password)) return res.status(400).send({ status: false, message: "Please send Alphanumeric with one Special 8 to 15 Character Password" })

    let isUserExist = await userModel.findOne({ email: email, password: password })
    if (!isUserExist)
        return res.status(401).send({status:false, message:"Email Id and password are incorrect"})
    const userToken = jwt.sign({ userId: isUserExist._id }, 'secretKey', { expiresIn: 1800 })

    return res.status(200).send({
        status: true,
        message: 'Success',
        data: {
            userToken: userToken,
            userId: isUserExist._id
        }
    })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
};

module.exports.createUser = createUser
module.exports.login = login
