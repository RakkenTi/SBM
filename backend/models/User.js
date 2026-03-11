const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userID: {
        type: String,
        unique: true
    },
    password: String
})

module.exports = mongoose.model('User', UserSchema)
