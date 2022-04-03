const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    cartId: {
        type: mongoose.ObjectId,
        ref: 'cart'
    },
    name: {
        type: String,
        require: true
    },
    province: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    wards: {
        type: String,
        require: true
    }, 
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
    },
    note: {
        type: String,
    },
    transportFee: {
        type: Number,
        min: 0,
        default: 30000
    },
    voucher: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('invoice', InvoiceSchema)