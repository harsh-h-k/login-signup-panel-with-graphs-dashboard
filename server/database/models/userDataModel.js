const mongoose = require('mongoose')
const userDataSchema = require('../schema/userData')

const UserData = mongoose.model("UserData",userDataSchema)

module.exports = UserData