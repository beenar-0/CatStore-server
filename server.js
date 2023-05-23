const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = require('config')
require('dotenv').config()
const db = process.env.MONGO_URL
const PORT = process.env.PORT || 5000
const Cat = require('./models/Cat')
const Order = require('./models/Order')

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connected to db')
    })
    .catch((error) => {
        console.log(error)
    })


app.listen(process.env.PORT || 5000, '0.0.0.0', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})

app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
})

app.use(express.json({
    type: ['application/json', 'text/plain']
}))


app.get('/get-all', (req, res) => {
    Cat
        .find()
        .then((cat) => {
            return res.send(JSON.stringify(cat))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.post('/add-cat', (req, res) => {
    const {name, description, price, type, img} = req.body
    const post = new Cat({name, description, price, type, img})
    post
        .save()
        .then((result) => {
            return res.send(result)
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})


app.post('/delete-cat', (req, res) => {
    Cat
        .findByIdAndRemove({_id: req.body.id})
        .then((result) => {
            return res.send(result)
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})


app.post('/edit-cat', (req, res) => {
    const post = req.body.post
    Cat.findByIdAndUpdate(req.body.postId, {
        name: post.name,
        description: post.description,
        price: post.price,
        img: post.img,
        type: post.type
    }, {new: true})
        .then((response) => {
            res.send(response)
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.post('/order', (req, res) => {
    const {name, address, email, phoneNumber, cats} = req.body
    const order = new Order({name, address, email, phoneNumber, cats})
    order
        .save()
        .then((result) => {
            return res.send(result)
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.get('/get-kind', (req, res) => {
    Cat
        .find({type: "kind"})
        .then((response) => {
            return res.send(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.get('/get-angry', (req, res) => {
    Cat
        .find({type: "angry"})
        .then((response) => {
            return res.send(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.get('/get-sad', (req, res) => {
    Cat
        .find({type: "sad"})
        .then((response) => {
            return res.send(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})