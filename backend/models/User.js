const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userID: String,
    password: String
})

module.exports = mongoose.model('User', UserSchema)
