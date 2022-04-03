const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserScheme = new Schema({
    surname: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model('user', UserScheme)