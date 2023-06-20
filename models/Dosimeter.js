const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    price: {
        type: String,
        required: true,

    },
    img: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    measurementRange: {
        type: String,
        required: true
    },
    energyRange: {
        type: String,
        required: true
    },
    protectionClass: {
        type: String,
        required: true
    }
})

const Dosimeter = mongoose.model('Dosimeter', postSchema)

module.exports = Dosimeter