const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const db = process.env.MONGO_URL
const PORT = process.env.PORT || 3001
const Dosimeter = require('./models/Dosimeter')
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
    Dosimeter
        .find()
        .then((cat) => {
            return res.send(JSON.stringify(cat))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.post('/add-dosimeter', (req, res) => {
    const {name, description, price, type, img, measurementRange, energyRange, protectionClass} = req.body
    const post = new Dosimeter({name, description, price, type, img, measurementRange, energyRange, protectionClass})
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


app.post('/delete-dosimeter', (req, res) => {
    Dosimeter
        .findByIdAndRemove({_id: req.body.id})
        .then((result) => {
            return res.send(result)
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})


app.post('/edit-dosimeter', (req, res) => {
    const post = req.body.post
    Dosimeter.findByIdAndUpdate(req.body.postId, {
        name: post.name,
        description: post.description,
        price: post.price,
        img: post.img,
        type: post.type,
        measurementRange: post.measurementRange,
        energyRange: post.energyRange,
        protectionClass: post.protectionClass
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
    const {name, address, email, phoneNumber, dosimeters} = req.body
    const order = new Order({name, address, email, phoneNumber, dosimeters})
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

app.get('/get-individual', (req, res) => {
    Dosimeter
        .find({type: "individual"})
        .then((response) => {
            return res.send(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.get('/get-pocket', (req, res) => {
    Dosimeter
        .find({type: "pocket"})
        .then((response) => {
            return res.send(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.get('/get-portable', (req, res) => {
    Dosimeter
        .find({type: "portable"})
        .then((response) => {
            return res.send(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.get('/get-wideRange', (req, res) => {
    Dosimeter
        .find({type: "wideRange"})
        .then((response) => {
            return res.send(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.get('/get-standard', (req, res) => {
    Dosimeter
        .find({type: "standard"})
        .then((response) => {
            return res.send(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})

app.get('/get-neutron', (req, res) => {
    Dosimeter
        .find({type: "neutron"})
        .then((response) => {
            return res.send(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            return res.send(error)
        })
})