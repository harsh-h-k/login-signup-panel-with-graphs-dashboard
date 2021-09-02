const mongoose = require('mongoose')

const userDataSchema = mongoose.Schema({
    name : String,
    email : String,
    india : Number,
    oman : Number,
    us : Number,
    growth : Number,
    loss : Number,
})

module.exports = userDataSchema