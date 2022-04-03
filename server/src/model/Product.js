const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slug = require('mongoose-slug-generator')

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    category: {
        type: Array,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
        required: true
    },
    img: {
        type: Array,
        required: true
    },
    material: {
        type: Array,
    }
}, {timestamps: true})

mongoose.plugin(slug);

module.exports = mongoose.model('product', ProductSchema)