const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userID: String

});

module.exports = mongoose.model("User", UserSchema);