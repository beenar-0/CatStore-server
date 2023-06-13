const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    phoneNumber: {
        type: String,
        required: false
    },
    dosimeters:{
        type: Object,
        required: true
    }
})

const Order = mongoose.model('Order', postSchema)

module.exports = Order