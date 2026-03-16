const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    productName: String,

    projectUsers: [String],

    // Key = user ID, Value = role ("Developer" or "ProductOwner")
    userLevel: {
        type: Map,
        of: String
    },

    // Key = user ID, Value = sprint identifier
    assignedSprint: {
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