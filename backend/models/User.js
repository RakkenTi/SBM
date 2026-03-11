const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userID: String,
    password: String,
    role: {
        type: String,
        enum: ['Client', 'Developer'],
        default: 'Developer',
    }
})

module.exports = mongoose.model('User', UserSchema)
