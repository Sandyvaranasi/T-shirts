const jwt = require('jsonwebtoken');
const shopModel = require('../models/shopModel.js');

const authentication = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key'];
        if (!token) return res.status(401).send({ message: "Login first" })

        await jwt.verify(token, 'secretKey', (error, decodedToken) => {
            if (decodedToken) {
                req.userId = decodedToken.userId
                next()
            } else return res.status(401).send(error.message)
        })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const vendorAuth = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key'];
        console.log(token);
        if (!token) return res.status(401).send({ message: "Login first" })
        let wrong = ''
        let ver = ''
        await jwt.verify(token, 'secretKey', (error, decodedToken) => {
            if (error) {
                wrong += error.message
            } else ver += decodedToken.userId
        })
        if (wrong.length > 2) return res.status(401).send(wrong);
        console.log(ver);
        if (ver.length > 2) {
            let shop = await shopModel.findById(ver)
            if (!shop) return res.status(401).send({ message: "please login as a vendor for this action" })
            req.shopId = shop._id;
            req.vendor = shop;
            next()
        } else
            return res.status(401).send("please login as a vendor for this action")

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

module.exports = { authentication, vendorAuth }