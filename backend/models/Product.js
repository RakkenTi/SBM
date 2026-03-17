const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    productName: String,
    productDescription: String,
    productUsers: [String],

    // Key = user ID, Value = role ("Developer" or "ProductOwner")
    userLevels: {
        type: Map,
        of: String
    },

    // Key = user ID, Value = sprint identifier
    assignedSprints: {
        type: Map,
        of: String
    },

    sprintComplete: Number,
    sprintLeft: Number,
    estimatedTime: Number, // everytime you add an item, it will change this #
    numberSprints: Number,
    daysRemSprint: Number,
    daysRemProduct: Number,

    //PBL VARS
    PBLItems: Array,
    SBLItems: Array
})

module.exports = mongoose.model('Product', ProductSchema)