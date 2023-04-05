const mongoose = require('mongoose')
const tShirtSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop',
        require: true
    },
    productname: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    baseprice: {
        type: String,
        required: true,
        trim: true
    },
    sizes: {
        type: [String],
        enum: ['Small', 'Medium', 'Large'],
        default: ["Medium"]
    },
    colors: [String],
    productImage: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('tshirt', tShirtSchema)