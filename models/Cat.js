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
    }
})

const Cat = mongoose.model('Cat', postSchema)

module.exports = Cat