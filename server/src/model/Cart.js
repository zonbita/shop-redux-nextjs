const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    products: [
        {
            productId: {
                type: mongoose.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                min: 1,
                default: 1
            },
            color: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('cart', CardSchema)