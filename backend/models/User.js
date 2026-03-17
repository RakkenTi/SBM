const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userID: String,
    password: String,
    products: [String]
})

module.exports = mongoose.model('User', UserSchema)
