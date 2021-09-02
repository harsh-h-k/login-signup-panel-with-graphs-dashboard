
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// DATABASE MODELS 
const User = require('../database/models/userModel')
const UserData = require('../database/models/userDataModel')

//ROUTES

router.get('/', (req, res) => {
    res.send("up and working")
})

router.get('/getUsers', async (req, res) => {
    await User.find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).end(`ERROR : ${error}`))

})

router.post('/signup', async (req, res) => {

        const randomInteger = (range, fixed) => {
            return Math.floor((Math.random() * range) + fixed)
        }
    
        const newUser = User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
    
        const newUserData = UserData({
            name: req.body.name,
            email: req.body.email,
            india: randomInteger(300, 100),
            oman: randomInteger(300, 100),
            us: randomInteger(300, 100),
            growth: `${randomInteger(40, 10)}.${randomInteger(50, 10)}`,
            loss: `${randomInteger(40, 10)}.${randomInteger(50, 10)}`,
        })
    
        newUserData.save()
        await newUser.save()
            .then(() => res.status(200))
            .catch((err) => res.send(`ERROR : ${err}`))
    
    })
    


router.get('/getUserData/:email', async (req, res) => {
    const emailAdd = req.params.email
    await UserData.find({ "email" : emailAdd })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.send(`ERROR : ${err}`))
})
// EXPORTS 
module.exports = router